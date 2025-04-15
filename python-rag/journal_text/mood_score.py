from langchain.prompts import PromptTemplate
import json
from langchain.docstore.document import Document
from langchain_astradb import AstraDBVectorStore
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
End_point = os.getenv("ASTRA_DB_API_ENDPOINT")
token = os.getenv("ASTRA_DB_APPLICATION_TOKEN")

os.environ["GOOGLE_API_KEY"] = api_key

os.environ['GRPC_ENABLE_FORK_SUPPORT'] = '0'


llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0.5,
    max_tokens=None,
    timeout=None,
    max_retries=2
)
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

# Initialize Vector Store
vector_store = AstraDBVectorStore(
    collection_name="astra_vector_langchain",
    embedding=embeddings,
    api_endpoint=End_point,
    token=token,
    namespace=None
)


score_prompt = PromptTemplate(
    input_variables=["text"],
    template="""Analyze the following journal entry and determine mood levels on a scale of 0-10.
    Return only a JSON object with the following format:
    {{"anxietyLevel": X, "low_moodLevel": X, "contentmentLevel": X,
        "frustrationLevel": X, "excitementLevel": X}}
    where X is an integer from 0 to 10.

    Journal entry: {text}"""
)


def store_journal_entry(text, user_id):
    doc = Document(
        page_content=text,
        metadata={"user_id": user_id}
    )
    vector_store.add_documents([doc])
    print(f"entry for user {user_id} stored")


def retrive_moodScore(text, user_id):
    formatted_prompt = score_prompt.format(text=text)
    response = llm.invoke(formatted_prompt)
    store_journal_entry(text, user_id)

    try:
        mood_scores = json.loads(
            response.content.strip("```json").strip("```"))
        return mood_scores  # Return as a dictionary
    except json.JSONDecodeError as e:
        print(f"⚠️ JSON Parsing Error: {e}")
        print(f"🔍 Raw Response: {response.content}")
        return None  # Handle errors gracefully

# journal_text = "I have a little problem today, I feel a slight discomfort every time I try to breathe. It started happening a few days ago. Though I suppose it's nothing really. I should stop eating junk."
# print(retrive_moodScore(text=journal_text))
#


def retrieve_related_entries(user_id, text, top_k=3):
    results = vector_store.similarity_search(
        query=text,
        k=top_k,
        filter={"user_id": user_id}
    )
    return results


def retrieve_feedback(user_id, text):
    related_entries = retrieve_related_entries(user_id, text)

    context_text = "\n\n".join(
        [f"-{doc.page_content}" for doc in related_entries])

    final_prompt = f"""
    You are analyzing a user's mental health journal.

    Based on the user's past journal entries and their current entry, provide a concise feedback message that:
    - Reflects on their emotional state or patterns you observe
    - Suggests specific, positive, and actionable steps the user can take to improve their mental well-being.

    Respond in a single, friendly and supportive string without any extra formatting.

    Past Journal Entries:
    {context_text if context_text else "No past entries available."}

    Current Journal Entry:
    {text}
    """

    response = llm.invoke(final_prompt)
    return response.content

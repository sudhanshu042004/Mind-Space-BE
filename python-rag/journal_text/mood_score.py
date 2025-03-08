import os 
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
End_point = os.getenv("ASTRA_DB_API_ENDPOINT")
token = os.getenv("ASTRA_DB_APPLICATION_TOKEN")

os.environ["GOOGLE_API_KEY"] = api_key

os.environ['GRPC_ENABLE_FORK_SUPPORT'] = '0'

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_astradb import AstraDBVectorStore
from langchain.docstore.document import Document
from langchain.prompts import PromptTemplate 

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0.5,
    max_tokens=None,
    timeout=None,
    max_retries=2
)
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

# Initialize Vector Store
# vector_store = AstraDBVectorStore(
#     collection_name="astra_vector_langchain",
#     embedding=embeddings,
#     api_endpoint=End_point,
#     token=token,
#     namespace=None
# )

score_prompt = PromptTemplate(
    input_variables=["text"],
    template="""Analyze the following journal entry and determine mood levels on a scale of 0-10. 
    Return only a JSON object with the following format:
    {{"anxietyLevel": X, "low_moodLevel": X, "contentmentLevel": X, "frustrationLevel": X, "excitementLevel": X}}
    where X is an integer from 0 to 10.

    Journal entry: {text}"""
)
import json

def retrive_moodScore(text):
    formatted_prompt = score_prompt.format(text=text)
    response = llm.invoke(formatted_prompt)

    try:
        mood_scores = json.loads(response.content.strip("```json").strip("```")) 
        return mood_scores  # Return as a dictionary
    except json.JSONDecodeError as e:
        print(f"⚠️ JSON Parsing Error: {e}")
        print(f"🔍 Raw Response: {response.content}")
        return None  # Handle errors gracefully

journal_text = "I have a little problem today, I feel a slight discomfort every time I try to breathe. It started happening a few days ago. Though I suppose it's nothing really. I should stop eating junk."
print(retrive_moodScore(text=journal_text))
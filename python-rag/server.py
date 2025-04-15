import grpc
from concurrent import futures
import time
import mindSpace_pb2_grpc as pb2_grpc
import mindSpace_pb2 as pb2
from journal_text.mood_score import retrive_moodScore
from journal_text.mood_score import retrieve_feedback


class UnaryService(pb2_grpc.UnaryServicer):
    def GetServerResponse(self, request, context):
        message = request.name
        if message:
            res = f"Hello I am {message} and this is from grpc server"
            result = {"message": res, "recieved": True}
            return pb2.Response(**result)
        else:

            result = {"message": "there is no name", "recieved": False}
            return pb2.Response(**result)

    def GetMoodScore(self, request, context):
        jounral_text = request.text
        userId = request.userId
        print(userId)
        score = retrive_moodScore(text=jounral_text, user_id=userId)
        mood_score = {
            "AnxietyLevel": score.get("anxietyLevel"),
            "LowMoodLevel": score.get("low_moodLevel"),
            "ContentmentLevel": score.get("contentmentLevel"),
            "FrustrationLevel": score.get("frustrationLevel"),
            "ExcitementLevel": score.get("excitementLevel")
        }
        return pb2.MoodScore(**mood_score)

    def GetFeedBack(self, request, context):
        journal_text = request.text
        userId = request.userId
        result = retrieve_feedback(user_id=userId, text=journal_text)
        feedback = {
            "text": result
        }
        return pb2.Feedback(**feedback)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pb2_grpc.add_UnaryServicer_to_server(UnaryService(), server)
    server.add_insecure_port("[::]:50051")
    server.start()
    print("server started at 50051")
    server.wait_for_termination()


if __name__ == "__main__":
    serve()

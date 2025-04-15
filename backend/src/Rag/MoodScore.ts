import express, { type Request, type Response } from "express"
import * as grpc from "@grpc/grpc-js"
import { middleware } from "../middleware";
import { UnaryClient } from "../../proto/generated/mindSpace_grpc_pb";
import { JournalText as grpcJournaltext, Feedback as feedbackRes, MoodScore as grpcRes } from "../../proto/generated/mindSpace_pb";
import { JournalEntry, type JournalEntryType, type MoodScoreType } from "../types/Entery";
import { drizzle } from "drizzle-orm/postgres-js";
import { diaryEntry, moodScore } from "../db/schema";
import { desc, eq } from "drizzle-orm";

export const MoodScore = express.Router()

const db = drizzle(process.env.DATABASE_URL!);

const client = new UnaryClient(
  'localhost:50051',
  grpc.credentials.createInsecure()
)

MoodScore.post('/', middleware, (req: Request, res: Response) => {
  const entry = req.body;
  const { success, data } = JournalEntry.safeParse(entry);

  if (!data || !success) {
    res.status(400).json({
      "message": 'invalid Entry'
    })
    return;
  }

  const userId = req.userId;

  const grpcRequest = new grpcJournaltext();
  grpcRequest.setText(data.text).setUserid(userId)

  client.getMoodScore(grpcRequest, (err: grpc.ServiceError | null, grpcResponse: grpcRes) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "grpc server error"
      })
    }

    const score = {
      anxietyLevel: grpcResponse.getAnxietylevel(),
      lowMoodLevel: grpcResponse.getLowmoodlevel(),
      contentmentLevel: grpcResponse.getContentmentlevel(),
      frustrationLevel: grpcResponse.getFrustrationlevel(),
      excitementLevel: grpcResponse.getExcitementlevel()
    }

    try {
      uploadDiaryEntry(data, userId)
      uploadMoodScore(score, userId)
    } catch (e) {
      res.status(500).json({
        message: "something went wrong while uploading on db"
      })
    }

    res.status(200).json(score)
  })

})

async function uploadDiaryEntry(data: JournalEntryType, userId: number) {
  try {
    await db.insert(diaryEntry).values({
      createdBy: userId,
      ...data
    })
  } catch (e) {
    console.log(`error while uploadin dairy on db  `)
    console.error(e)
  }
}

async function uploadMoodScore(score: MoodScoreType, userId: number) {
  try {
    await db.insert(moodScore).values({
      createdBy: userId,
      ...score
    })

  } catch (e) {
    console.error(e)
  }
}

MoodScore.get('/', middleware, async (request: Request, response: Response) => {
  const userId = request.userId;

  try {
    const result = await db.select().from(moodScore).where(eq(moodScore.createdBy, userId))
    response.status(200).json({
      data: result,
      message: `user Id :${userId} MoodScore successfully fetched`
    })
  } catch (err) {
    response.status(500).json({
      message: "something went while fetching mood score"
    })

  }

})

MoodScore.get('/entries', middleware, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const result = await db.select().from(diaryEntry).where(eq(diaryEntry.createdBy, userId))
    res.status(200).json({
      data: result,
      message: `user id : ${userId} diary Entries`
    })
  } catch (e) {
    res.status(500).json({
      message: "something went wrong"
    })
  }
})

MoodScore.get('/feedback', middleware, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const result = await db.
      select()
      .from(diaryEntry)
      .orderBy(desc(diaryEntry.id))
      .limit(1)
    const lastEntry = result[0]

    const grpcRequest = new grpcJournaltext();
    grpcRequest.setText(lastEntry.text!).setUserid(userId)

    client.getFeedBack(grpcRequest, (err: grpc.ServiceError | null, response: feedbackRes) => {

      if (err) {
        console.error(err);
        res.status(500).json({
          message: "grpc server error"
        })
      }

      res.status(200).json({
        message: "successfully get feedback",
        feedback: response.getText()
      })
    })
  } catch (e) {
    res.status(500).json({
      message: "something went wrong"
    })

  }
})

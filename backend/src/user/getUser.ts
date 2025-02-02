import express, { type Request, type Response } from "express";
import { middleware } from "../middleware";
import { eq } from "drizzle-orm";
import { user } from "../db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { UserZod } from "../types/userTypes";

export const userRoute = express.Router();

const db = drizzle(process.env.DATABASE_URL!)

userRoute.get("/", middleware, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const result = await db.select({
      userId: user.id,
      name: user.name,
      avatar: user.avatar,
      createdAt: user.createdAt,
      email: user.email,
    })
      .from(user)
      .where(eq(user.id, userId))

    const userData = result[0];
    res.status(200).json({
      "message": "successfully made req",
      "data": userData
    })

  } catch (e) {
    console.error(e);
    res.status(500).json({
      "message": "something went wrong"
    })
  }

})

userRoute.put("/", middleware, async (req: Request, res: Response) => {
  const reqData = req.body;

  const { success, data } = UserZod.safeParse(reqData);
  if (!success || !data) {
    res.status(400).json({
      "message": "Invalid input"
    })
    return;
  }
  const userId = req.userId;
  try {
    const { name, avatar } = data

    if (avatar) {
      await db.update(user).set({ avatar: avatar }).where(eq(user.id, userId))
    }
    if (name) {
      await db.update(user).set({ name: name }).where(eq(user.id, userId))
    }

    if (!name && !avatar) {
      res.status(400).json({
        "message": "Request body cannot be empty"
      })
    }

    res.status(200).json({
      "message": "user updated"
    })

  } catch (e) {
    console.error(e)
    res.status(500).json({
      "message": "something went wrong"
    })
  }
})

import express from "express";
import { LoginZod, type LoginType } from "../types/userTypes";
import { drizzle } from "drizzle-orm/postgres-js";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = express.Router();
const db = drizzle(process.env.DATABASE_URL!);

login.post("/", async (req, res) => {
  const body: LoginType = req.body;
  try {
    const { success, data } = LoginZod.safeParse(body);
    if (!success) {
      res.status(400).json({
        "message": "Invalid input"
      })
      return;
    }

    const { email, password } = data;

    const existingUser = await db.select({ userId: user.id, hashedPassword: user.password }).from(user).where(eq(user.email, email));
    if (existingUser.length === 0) {
      res.status(404).json({
        "message": "user doesn't exists"
      })
      return;
    }

    const { userId, hashedPassword } = existingUser[0]

    const isPasswordValid = bcrypt.compareSync(password, hashedPassword)
    if (!isPasswordValid) {
      res.status(401).json({
        "message": "Invalid credentials"
      })
      return;
    }

    const payload = { userId: userId };
    const privateKey = await Bun.file("src/secret/private.key").text();

    const token = jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn: "7d" })
    const week = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    res.status(200).cookie("session", token, { expires: week }).json({
      "message": "user successfully login",
      "session": token
    })

  } catch (e) {
    console.log(e)
    res.status(500).json({
      "message": "something went wrong"
    })

  }
})

import express from "express"
import { SignupZod, type SignupType } from "../types/userTypes";
import bcrypt from "bcryptjs"
import { drizzle } from "drizzle-orm/postgres-js";
import { user } from "../db/schema";
import jwt from "jsonwebtoken"
import { eq } from "drizzle-orm";
import { middleware } from "../middleware";

export const signup = express.Router();

const db = drizzle(process.env.DATABASE_URL!);

signup.post('/', middleware, async (req, res) => {
  const body: SignupType = req.body;
  try {
    // validating data
    const { success, data, error } = SignupZod.safeParse(body);

    if (!success) {
      console.error(error)
      res.status(400).json({ "message": "Invalid input" })
      return;
    }

    const { name, email, password } = data;

    //handling existing User
    const existingUser = await db.select().from(user).where(eq(user.email, email))
    if (existingUser.length > 0) {
      res.status(409).json({
        "message": "email already exist"
      })
      return;
    }

    // password hash
    const hashPassword = bcrypt.hashSync(password, 10);
    // new user
    const newUser: typeof user.$inferInsert = {
      name: name,
      email: email,
      password: hashPassword
    }
    const result = await db.insert(user).values(newUser).returning({ userId: user.id })
    const userId = result[0].userId;

    const privateKey = await Bun.file("src/secret/private.key").text();
    const payload = { userId: userId };

    //token genrate
    const token = jwt.sign(payload, privateKey, { expiresIn: '7d', algorithm: "RS256" })
    const week = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    //send cookie
    res.status(200).cookie("session", token, { expires: week, }).json({
      "message": "user successfully created"
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({
      "message": "something went wrong"
    })
  }
})


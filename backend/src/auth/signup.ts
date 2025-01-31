import express from "express"
import { SignupZod, type SignupType } from "../types/userTypes";
import bcrypt from "bcryptjs"

export const signup = express.Router();

signup.post('/', (req, res) => {
  const body: SignupType = req.body;
  const { success, data, error } = SignupZod.safeParse(body);

  if (!success) {
    console.error(error)
    res.status(400).json({ "message": "Invalid input" })
    return;
  }

  const { name, email, password } = data;

  const hashPassword = bcrypt.hashSync(password, 10);

  res.json({ name, email, hashPassword })
})


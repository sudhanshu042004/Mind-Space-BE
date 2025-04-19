import express from "express";
import { signup } from "./auth/signup";
import { login } from "./auth/login";
import { userRoute } from "./user/getUser";
import { MoodScore } from "./Rag/MoodScore";
import cors from "cors"

const port = process.env.PORT! || 3000;

let correctPort: number;

if (typeof port === "string") {
  correctPort = parseInt(port)
} else {
  correctPort = port
}
const app = express();
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    "msg": "this is backend point",
  })
})
app.use("/signup", signup)
app.use("/login", login)
app.use("/user", userRoute)
app.use('/moodScore', MoodScore)

app.listen(correctPort, () => console.log(`server is listening at port ${correctPort}`))

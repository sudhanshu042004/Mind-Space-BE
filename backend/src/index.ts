import express from "express";
import { signup } from "./auth/signup";
const app = express();
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    "msg": "hlll"
  })
})
app.use("/signup", signup)

app.listen(8080, () => console.log("server is listening at port 8080"))

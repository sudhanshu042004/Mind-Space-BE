import express from "express";
import { signup } from "./auth/signup";
import { login } from "./auth/login";

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    "msg": "this is backend point",
  })
})
app.use("/signup", signup)
app.use("/login", login)

app.listen(8080, () => console.log("server is listening at port 8080"))

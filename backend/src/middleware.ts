import jwt, { type JwtPayload } from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express"

export const middleware = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.cookie;
  if (!auth) {
    res.status(401).json({
      "message": "unauthorized"
    })
    return;
  }
  const cookieArray = auth.split('; ');
  const cookieObject: Record<string, string> = {};

  cookieArray.forEach(cookie => {
    const [key, value] = cookie.split('=');
    cookieObject[key] = value;
  });
  const sessionCookie = cookieObject["session"]
  if (!sessionCookie) {
    res.status(401).json({
      "message": "unauthorized",
    })
    return;
  }

  try {
    const publicKey = await Bun.file("src/secret/public.key").text();
    const isAuthentic = jwt.verify(sessionCookie, publicKey, { algorithms: ["RS256"] })
    // isAuthentic  check

  } catch (e) {
    console.log(e);
    res.status(401).json({
      "message": "unauthorized"
    })
  }
}

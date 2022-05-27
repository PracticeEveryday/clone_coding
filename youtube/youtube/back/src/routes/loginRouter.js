import { Router } from "express";

import { loginService } from "../service/loginService";
import { verifyToken } from "../middlewares/verifyToken";

const loginRouter = Router();

loginRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const User = await loginService.login({ email, password });

    if (User.errorMessage) {
      throw new Error(User.errorMessage);
    }

    res.status(200).json(User);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

loginRouter.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({
    status: "succ",
    userId: req.user,
  });
});
export { loginRouter };

import { Router } from "express";

import { loginService } from "../service/loginService";
import { verifyToken } from "../middlewares/verifyToken";

const loginRouter = Router();

loginRouter.post("/login", async (req, res, next) => {
  // user 생성
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
    next(error);
  }
});

loginRouter.put("/login", verifyToken, async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const userId = req.user;

    const updatedUser = await loginService.update({
      email,
      password,
      name,
      userId,
    });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
    next(error);
  }
});

loginRouter.delete("/login", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user;
    const deletedUser = await loginService.delete({ userId });

    if (deletedUser.errorMessage) {
      throw new Error(deletedUser.errorMessage);
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
});

loginRouter.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({
    status: "succ",
    userId: req.user,
  });
});
export { loginRouter };

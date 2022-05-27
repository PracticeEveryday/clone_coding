import { Router } from "express";
import { LikeService } from "../service/LikeService";
import { verifyToken } from "../middlewares/verifyToken";

const likeRouter = Router();

// 좋아요 만들기, 삭제하기
likeRouter.post("/like/:id", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user;
    const video_id = req.params.id;
    const newLike = await LikeService.create({ userId, video_id });

    if (newLike.errorMessage) {
      throw new Error(newLike.errorMessage);
    }
    res.status(200).json(newLike);
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
    next(error);
  }
});

// 전체 라이크 리스트 조회
likeRouter.get("/likeList", verifyToken, async (req, res, next) => {
  const likeList = await LikeService.likeList();
  res.status(200).json(likeList);
});

export { likeRouter };

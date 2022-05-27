import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { CommentService } from "../service/commentService";

const commentRouter = Router();

// commentRouter.use(loginRequired);

// 댓글작성
commentRouter.post("/comment", async (req, res) => {
  try {
    CommentService.create(req.body);
    return res.status(201).json({ sucess: true });
  } catch (err) {
    return res.json({ success: false });
  }
});

// 댓글 1개 조회
commentRouter.post("/comments/comment", async (req, res) => {
  try {
    CommentService.getComment(req.body).then((comment) => {
      res.status(200).json({ success: true, comment });
    });
  } catch (err) {
    return res.json({ success: false });
  }
});

// 비디오에 해당하는 댓글 모두 조회
commentRouter.post("/comments", async (req, res) => {
  try {
    const video_id = req.body.video_id;
    CommentService.getComments(video_id).then((comments) => {
      res.status(200).json({ success: true, comments });
    });
  } catch (err) {
    return res.json({ success: false });
  }
});

// 댓글 삭제
commentRouter.post("/commentsDelete", async (req, res) => {
  try {
    CommentService.deleteComment(req.body).then(
      res.status(201).json({ success: true })
    );
  } catch (err) {
    return res.json({ success: false });
  }
});

export { commentRouter };

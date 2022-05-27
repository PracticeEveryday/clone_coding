import { Comment } from "../schema/comment";
// dao와 같은기능
class CommentModel {
  // 댓글 작성
  static create = ({ writer, video_id, content }) => {
    const newComment = new Comment({
      writer,
      video_id,
      content,
    });
    newComment.save();
  };

  // 댓글 1개 조회
  static get = async (id) => {
    const comment = await Comment.find({ _id: id }).populate("writer");
    return comment;
  };

  // 전체 댓글 조회
  static getAll = async (video_id) => {
    const comments = await Comment.find({ video_id: video_id }).populate(
      "writer"
    );
    return comments;
  };

  // 댓글 삭제
  static delete = async (id) => {
    const comment = Comment.findOneAndDelete({ _id: id });
    return comment;
  };

  static deleteAll = async (video_id) => {
    await Comment.deleteMany({ video_id });
  };
}

export { CommentModel };

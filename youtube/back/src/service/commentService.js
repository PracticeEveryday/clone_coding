import { CommentModel } from "../db/model/Comment";
// comment
class CommentService {
  static create = (comment) => {
    CommentModel.create(comment);
  };

  static getComment = async (id) => {
    const comment = await CommentModel.get(id);
    return comment;
  };
  static getComments = async (video_id) => {
    const comments = await CommentModel.getAll(video_id);
    return comments;
  };
  static deleteComment = async (id) => {
    CommentModel.delete(id);
  };
  static deleteAll = async (id) => {
    CommentModel.deleteAll(id);
  };
}

export { CommentService };

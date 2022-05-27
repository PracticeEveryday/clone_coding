import { model, Schema } from "mongoose";
// 몽고DB에서 자동으로 _id 생성되어 저장됨 ->ObjectId
const LikeSchema = new Schema({
  video_id: {
    type: Schema.Types.ObjectId,
    ref: "Video",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Like = model("Like", LikeSchema);

export { Like };

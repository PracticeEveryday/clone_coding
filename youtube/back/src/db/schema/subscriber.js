import { model, Schema } from "mongoose";

// 몽고DB에서 자동으로 _id 생성되어 저장됨 -> ObjectId
const SubscriberSchema = new Schema({
  userTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // created_at: {
  //   type: Date,
  //   required: true,
  //   default: Date.now,
  // },
});

const Subscriber = model("Subscriber", SubscriberSchema);

export { Subscriber };

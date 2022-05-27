import { UserModel } from "./model/User";
import { VideoModel } from "./model/Video";
import { CommentModel } from "./model/Comment";
import { SubscriberModel } from "./model/Subscriber";
import { LikeModel } from "./model/Like";

import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const MONGO = process.env.MONGO_URL;

mongoose
  .connect(MONGO)
  .then(() => console.log(`${MONGO} connected on!`))
  .catch(() => console.log("몽고 DB연결 실패 ㅠㅠ"));

export { UserModel, VideoModel, SubscriberModel, CommentModel, LikeModel };

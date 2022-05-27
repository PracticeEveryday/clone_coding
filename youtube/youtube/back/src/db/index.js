import { UserModel } from "./model/User";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const MONGO = process.env.MONGO_URL;

mongoose
  .connect(MONGO)
  .then(() => console.log(`${MONGO} connected on!`))
  .catch(() => console.log("몽고 DB연결 실패 ㅠㅠ"));

export { UserModel };

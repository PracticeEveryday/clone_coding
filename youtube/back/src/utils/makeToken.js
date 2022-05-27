import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const makeToken = (Object) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(Object, jwtkey, { expiresIn: "24h" });
  return token;
};

export { makeToken };

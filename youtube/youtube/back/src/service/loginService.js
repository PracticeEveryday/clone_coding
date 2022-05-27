import { UserModel } from "../db/index";

import { hashPassword } from "../utils/hashPassword";
import { makeToken } from "../utils/makeToken";

class loginService {
  // login 하기
  static login = async ({ email, password }) => {
    let user = await UserModel.findByEmail({ email });

    const hashedPassword = hashPassword(password);

    if (!user) {
      // 가입 여부
      const errorMessage =
        "해당 아이디로 가입된 유저가 없습니다. 다시 한 번 확인해주세요";
      return { errorMessage };
    } else if (user.password === hashedPassword) {
      // 비밀번호 일치 여부
      const token = makeToken({ userId: user._id });

      user = {
        ...user,
        accessToken: token,
      };

      return user;
    } else {
      // 비밀번호 틀림 ㅠㅠ
      const errorMessage = "비밀 번호가 틀립니다 다시 한 번 확인해주세요";
      return { errorMessage };
    }
  };
}

export { loginService };

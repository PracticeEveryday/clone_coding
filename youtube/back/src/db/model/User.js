import { User } from "../schema/user";
class UserModel {
  // 유저 가입
  static create = async (newUserData) => {
    const newUser = await User.create(newUserData);
    return newUser;
  };

  // 이메일로 유저 가입 여부 확인
  static findByEmail = async ({ email }) => {
    const user = await User.findOne({ email }).lean();
    return user;
  };

  static update = async ({ filter, updateUserData }) => {
    const option = { returnOriginal: false };
    const updatedUser = await User.findOneAndUpdate(
      filter,
      updateUserData,
      option
    );
    return updatedUser;
  };

  static findById = async ({ id }) => {
    const user = await User.findById(id);
    return user;
  };

  static delete = async ({ id }) => {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  };
}

export { UserModel };

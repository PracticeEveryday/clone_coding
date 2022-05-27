import { Subscriber } from "../schema/subscriber";
// dao와 같은 기능
class SubscriberModel {
  // 구독하기
  static create = ({ userTo, userFrom }) => {
    const newsubscribe = new Subscriber({
      userTo,
      userFrom,
    });
    newsubscribe.save();
  };

  // 구독자 수
  static findNum = async (userTo) => {
    const subscriber = await Subscriber.find({ userTo: userTo });
    return subscriber;
  };

  // 구독했는지 여부 확인
  static findById = async (userTo, userFrom) => {
    const subscribed = await Subscriber.find({
      userTo: userTo,
      userFrom: userFrom,
    });
    return subscribed;
  };

  // 구독 취소하기
  static delete = async (userTo, userFrom) => {
    const subscriber = Subscriber.findOneAndDelete({
      userTo: userTo,
      userFrom: userFrom,
    });
    return subscriber;
  };

  //구독한 정보 찾기
  static findSubscriber = async (userFrom) => {
    const subscribed = await Subscriber.find({ userFrom: userFrom });
    return subscribed;
  };
}

export { SubscriberModel };

import { SubscriberModel } from "../db/model/Subscriber";

class SubscriberService {
  //구독하기
  static subscribe = (subscribeData) => {
    SubscriberModel.create(subscribeData);
  };
  // 구독자 수(구독을 누르면 해당 채널의 id가 userTo에 저장 -> userTo를 찾으면 구독자수 계산 가능)
  static subscriberNum = async (userTo) => {
    const subscriberNum = await SubscriberModel.findNum(userTo);
    return subscriberNum.length;
  };
  // 구독 했는지 여부 확인
  static subscribed = async (userTo, userFrom) => {
    const subscribed = await SubscriberModel.findById(userTo, userFrom);
    let result = false;
    if (subscribed.length != 0) {
      result = true;
    }
    return result;
  };
  // 구독 취소하기
  static unsubscribe = async (userTo, userFrom) => {
    SubscriberModel.delete(userTo, userFrom);
  };
  // 구독한 정보 찾기
  static subscribers = async (userFrom) => {
    const subscribed = await SubscriberModel.findSubscriber(userFrom);
    return subscribed;
  };
}

export { SubscriberService };

import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { SubscriberService } from "../service/subscriberService";

const subscriberRouter = Router();

// subscriberRouter.use(loginRequired);

// 구독하기
subscriberRouter.post("/subscribe", loginRequired, async (req, res) => {
  try {
    SubscriberService.subscribe(req.body);
    return res.status(201).json({ success: true });
  } catch (err) {
    return res.json({ success: false });
  }
});

// 구독 취소하기
subscriberRouter.post("/unsubscribe", loginRequired, async (req, res) => {
  try {
    const { userTo, userFrom } = req.body;
    SubscriberService.unsubscribe(userTo, userFrom);
    return res.status(201).json({ success: true });
  } catch (err) {
    return res.json({ success: false });
  }
});

// 구독자수
subscriberRouter.post("/subscriberNum", loginRequired, async (req, res) => {
  try {
    const userTo = req.body.userTo;
    SubscriberService.subscriberNum(userTo).then((subscriberNum) => {
      res.status(200).json({ success: true, subscriberNum });
    });
  } catch (err) {
    return res.json({ success: false });
  }
});

// 구독 했는지 여부
subscriberRouter.post("/subscribed", loginRequired, async (req, res) => {
  try {
    const { userTo, userFrom } = req.body;
    SubscriberService.subscribed(userTo, userFrom).then((result) => {
      res.status(200).json({ success: true, subscribed: result });
    });
    // 구독 한 상태면 true, 구독 안한 상태면 false
  } catch (err) {
    return res.json({ success: false });
  }
});

export { subscriberRouter };

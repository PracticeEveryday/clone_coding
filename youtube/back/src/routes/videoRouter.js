import { Router } from "express";
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
import { path } from "path";
import { VideoService } from "../service/videoService";
import { loginRequired } from "../middlewares/loginRequired";
import { SubscriberService } from "../service/subscriberService";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); //업로드 된 파일을 어디다 저장하는지 ( 현재 파일의 경로 기준 )
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); //파일 이름을 어떻게 저장할지 정하는 것
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      // mp4 파일만 받게 한다.
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

const videoRouter = Router();

videoRouter.post("/video/upload", async (req, res) => {
  //비디오를 서버에 업로드

  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

videoRouter.post("/video/thumbnail", async (req, res) => {
  //썸네일 사진 추출해서 저장
  let thumbsFilePath = "";
  let fileDuration = "";

  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.log("req.body.url", req.body.url);
    console.log("ffmpeg.ffprobe", ffmpeg.ffprobe);
    console.log("metadata", metadata);
    console.log("metadata.format.duration", metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        url: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
    });
});

videoRouter.post("/video/uploadVideo", async (req, res) => {
  //비디오 정보들을 저장
  try {
    VideoService.create(req.body);
  } catch (err) {
    return res.json({ success: false });
  }
  return res.status(201).json({ success: true });
});

videoRouter.get("/video/getVideos", async (req, res) => {
  //비디오 DB에서 가져와서 보내기
  try {
    const videos = await VideoService.getVideos();
    console.log(videos);
    return res.status(200).json({ videos });
  } catch (err) {
    return res.json({ success: false });
  }
});

videoRouter.get("/video/getVideoDetail/:id", async (req, res) => {
  //비디오 DB에서 상세정보 가져와서 보내기
  try {
    const id = req.params.id;
    const video = await VideoService.getVideoDetail(id);
    return res.status(200).json({ video });
  } catch (err) {
    return res.json({ success: false });
  }
});

videoRouter.post(
  "/video/getSubscriptionVideos",
  loginRequired,
  async (req, res) => {
    //유저 id로 유저의 구독자의 id를 전부 가져온다
    const user = req.body.userId;
    const subscriberInfo = await SubscriberService.subscribers(user);
    let subscribedUser = [];
    subscriberInfo.map((subscriber, i) => {
      subscribedUser.push(subscriber.userTo);
    });
    const videos = await VideoService.getVideoByWriter(subscribedUser);
    res.status(200).json(videos);
  }
);

videoRouter.post("/video/getVideoByWriter", loginRequired, async (req, res) => {
  //유저 id로 유저가 업로드한 동영상 전부를 가져온다.
  try {
    const user = req.body.userId;
    const userVideoInfo = await VideoService.getVideoByWriter(user);
    return res.status(200).json({ video: userVideoInfo });
  } catch (err) {
    return res.json({ succes: false });
  }
});

videoRouter.delete(
  "/video/deleteVideo/:id",
  loginRequired,
  async (req, res) => {
    //동영상 id 받아서 삭제
    try {
      const videoId = req.params.id;
      const result = await VideoService.deleteVideo(videoId);
      if (result.errorMessage) {
        return res.json(result.errorMessage);
      }
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
);

export { videoRouter };

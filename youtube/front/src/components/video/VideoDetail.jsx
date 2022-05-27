import React, { useEffect, useState } from "react";
import "../../css/VideoDetail.css";
import VideoDetailComment from "./VideoDetailComment";
import { Avatar } from "@mui/material";
import * as API from "../../api";
import moment from "moment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { IconButton } from "@mui/material";

import { Navigate, useNavigate } from "react-router-dom";

const VideoDetails = ({ id }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [description, setDescription] = useState("");
  const [viewCounts, setViewCounts] = useState(null);
  const [subscriberNum, setSubscriberNum] = useState(0);
  const [writerId, setWriterId] = useState("");
  const [subscribed, setSubscribed] = useState("unsubscribe");
  const [writer, setWriter] = useState("");
  const [isLike, setIsLike] = useState(false);

  const navigator = useNavigate();

  const getVideoDetail = async () => {
    try {
      const { data } = await API.get(`video/getVideoDetail/${id}`);
      setVideoInitialData(data);

      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const setVideoInitialData = async (data) => {
    setVideoUrl(data.video.filePath.substring(8));
    setDescription(data.video.description);
    setViewCounts(data.video.views);
    setTitle(data.video.title);
    setWriter(data.video.writer.name);
    setWriterId(data.video.writer._id);
    setUpdatedDate(moment(data.video.createdAt).format("YYYY-MM-DD"));
    console.log("data============>>", data);
    try {
      const subscriber = await API.post("subscriberNum", {
        userTo: data.video.writer._id,
      });
      setSubscriberNum(subscriber.data.subscriberNum);
      if (sessionStorage.getItem("userToken")) {
        const verifyUser = await API.get("verify");
        console.log("verify", verifyUser.data.userId, data.video.writer._id);
        const isSubscribed = await API.post("subscribed", {
          userTo: data.video.writer._id,
          userFrom: verifyUser.data.userId,
        });
        console.log(
          "isSubscribed.data.subscribed",
          isSubscribed.data.subscribed
        );
        if (isSubscribed.data.subscribed) {
          setSubscribed("subscribe");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getLikeList = async () => {
    try {
      const verifyUser = await API.get("verify");
      const likeList = await API.get("likeList");
      const filterLike = likeList.data.filter(
        (like) => like.userId === verifyUser.data.userId && like.video_id === id
      );
      console.log("filterLike before if============>", filterLike);
      if (filterLike.length !== 0) {
        console.log("filterLike.length !== 0");
        setIsLike(true);
      } else {
        console.log("test filter=================>");
        setIsLike(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getLikeList();
  }, [isLike, videoUrl]);

  useEffect(() => {
    getVideoDetail().then((res) => console.log("Successfully get Data"));
  }, [id, subscribed]);

  const handleSubscribe = async (e) => {
    const verifyUser = await API.get("verify");
    if (e.target.innerText === "UNSUBSCRIBE") {
      await API.post("unsubscribe", {
        userTo: writerId,
        userFrom: verifyUser.data.userId,
      }).then(setSubscribed("unsubscribe"));
      

    } else {
      await API.post("subscribe", {
        userTo: writerId,
        userFrom: verifyUser.data.userId,
      }).then(setSubscribed("subscribe"));
      
    }
  };

  const handleLike = async () => {
    if (!sessionStorage.getItem("userToken")) {
      return alert("로그인이 필요한 서비스입니다.");
    }
    try {
      console.log("handleLike start");
      const verifyUser = await API.get("verify");
      const likeData = await API.post(`like/${id}`);
      console.log("likeData", likeData);
      if (likeData.data.message === "delete") {
        console.log("likeData.data.message========>", likeData.data.message);
        setIsLike(false);
      } else {
        setIsLike(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubscribePage = () => {
    navigator(`/subscribePage/${writerId}`);
  };

  return (
    
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <video src={`http://localhost:3001/${videoUrl}`} controls />
      </div>

      <div className="details">
        <div className="title">{title}</div>
        <div className="subscriberCount">{updatedDate}.</div>
        <div className="iconButton">
          <IconButton onClick={handleLike}>
            {isLike ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
          </IconButton>
        </div>
      </div>
      <hr />
      <div className="writer">
        <Avatar src="/static/images/avatar/1.jpg" />
        <div className="subscriber">
          <p className="channelName" onClick={handleSubscribePage}>
            {writer}
          </p>
          <p className="subscriberCount">구독자 {subscriberNum}명</p>
          <div>{description}</div>
        </div>
        {sessionStorage.getItem("userToken") && (
          <div className="btnWrapper">
            <button
              className={`subscribeButton ${subscribed}`}
              onClick={handleSubscribe}
            >
              {subscribed === "subscribe" ? "UNSUBSCRIBE" : "SUBSCRIBE"}
            </button>
          </div>
        )}
      </div>
      <hr />
      <VideoDetailComment id={id} />
    </div>

  );
};

export default VideoDetails;




 
import React, { useEffect, useState } from "react";
import VideoDetail from "./VideoDetail";
import VideoList from "./VideoList";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import * as API from "../../api";
import SideBar from "../../NavBar/SideBar";

const VideoDetailPage = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const { Content } = Layout

  const handleSelect = (video) => {
    navigator(`/video/${video._id}`);
    console.log("test");
  };

  return (
    <>
      <SideBar />
        <Content
            style={{
              minWidth: '1200px',
              marginLeft: '216px',
              marginTop: '16px',
              marginRight: '16px',
              position: 'relative',
              overflow: 'initial',
            }}>
          <VideoDetail id={id} />
          <VideoList onVideoSelect={handleSelect} id={id} />
        </Content>
    </>
  );
};

export default VideoDetailPage;

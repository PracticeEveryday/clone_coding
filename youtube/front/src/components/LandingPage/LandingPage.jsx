import React, { useEffect, useState } from 'react';
import { Layout, Card, Avatar, Col, Typography, Row, PageHeader } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/video/getVideos").then((response) => {
      if (response.data) {
        console.log(response.data.videos);
        setVideos(response.data.videos);
      } else {
        alert("비디오를 가져오는데 실패하였습니다.");
      }
    });
  }, []);

  const renderCards = Videos.map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);

    console.log(video.writer);

    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              alt="thumbnail"
              src={`http://localhost:3001/${video.thumbnail}`}
            />
            <div
              className=" duration"
              style={{
                bottom: 0,
                right: 0,
                position: "absolute",
                margin: "4px",
                color: "#fff",
                backgroundColor: "rgba(17, 17, 17, 0.8)",
                opacity: 0.8,
                padding: "2px 4px",
                borderRadius: "2px",
                letterSpacing: "0.5px",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "12px",
              }}
            >
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
        />
        <span>{video.writer.name} </span>
        <br />
        <span style={{ marginLeft: "3rem" }}> {video.views}</span>-{" "}
        <span> {moment(video.createdAt).format("MMM Do YY")} </span>
      </Col>
    );
  });

  return (
    <Content
      style={{
        minWidth: '1200px',
        marginLeft: '216px',
        marginTop: '16px',
        marginRight: '16px',
        position: 'relative',
        overflow: 'initial',
      }}
    >
      <PageHeader
        className="subscribe-page-header"
        ghost={false}
        title="추천 동영상"
        // subTitle={`총 ${videoList.length}개`}
        avatar={{
          src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
        }}
        extra={[]}
      >
        {" "}
      </PageHeader>
      <hr />

      <Row gutter={12}>{renderCards}</Row>
    </Content>
  );
}

export default LandingPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Form, message, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import * as Api from "../../api";
import Axios from "axios";

import { useRecoilValue, useRecoilState } from "recoil";
import { userInfoState, tokenState } from "../../atom";

import Container from "@mui/material/Container";

// import styled compo
import { ValidationTextField, ColorButton } from "../../styledCompo/muiCustom";
import { UploadTitle, UploadGlass } from "../../styledCompo/VideoUploadStyle";

const { Title } = Typography;
const { TextArea } = Input;

// const Private = [
//   { value: 0, label: "Private" },
//   { value: 1, label: "Public" },
// ];

// const Catogory = [
//   { value: 0, label: "Film & Animation" },
//   { value: 0, label: "Autos & Vehicles" },
//   { value: 0, label: "Music" },
//   { value: 0, label: "Pets & Animals" },
//   { value: 0, label: "Sports" },
// ];

function VideoUploadPage() {
  const user = useRecoilValue(userInfoState);
  const token = useRecoilValue(tokenState);
  useEffect(() => {
    console.log(user);
  }, []);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [Thumbnail, setThumbnail] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };

  const handleChangeDecsription = (event) => {
    console.log(event.currentTarget.value);

    setDescription(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (user && !token) {
      return alert("Please Log in First");
    }

    if (title === "" || Description === "" || Thumbnail === "") {
      return message.error("모든 항목을 채워주세요");
    }

    const variables = {
      writer: user._id,
      title: title,
      description: Description,
      filePath: FilePath,
      duration: Duration,
      thumbnail: Thumbnail,
    };

    Axios.post("http://localhost:3001/video/uploadVideo", variables).then(
      (response) => {
        if (response.data.success) {
          message.success("video Uploaded Successfully");

          // 3초 후 메인페이지로 이동
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          alert("비디오 업로드 실패");
        }
      }
    );
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = { header: { "content-type": "multipart/form-data" } };
    formData.append("file", files[0]);

    Axios.post("http://localhost:3001/video/upload", formData, config).then(
      (response) => {
        if (response.data.success) {
          console.log("결과", response.data);

          let variable = {
            url: response.data.url,
            fileName: response.data.fileName,
          };

          setFilePath(response.data.url);

          Axios.post("http://localhost:3001/video/thumbnail", variable).then(
            (response) => {
              if (response.data.success) {
                console.log("썸네일 결과", response.data);
                setDuration(response.data.fileDuration);

                setThumbnail(response.data.url);
              } else {
                alert("썸네일 생성 실패");
              }
            }
          );
        } else {
          alert("failed");
        }
      }
    );
  };
  console.log("FilePath", FilePath);
  console.log("Duration", Duration);
  console.log("Thumbnail", Thumbnail);

  return (
    <>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "120px",
        }}
      >
        <UploadGlass>
          <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
            <UploadTitle style={{ textAlign: "center" }}>
              VideoUpload
            </UploadTitle>

            <Form onSubmit={onSubmit}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      style={{
                        width: "300px",
                        height: "240px",
                        border: "1px solid lightgray",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <PlusOutlined style={{ fontSize: "3rem" }} />
                    </div>
                  )}
                </Dropzone>

                {Thumbnail && (
                  <div>
                    <img
                      src={`http://localhost:3001/${Thumbnail}`}
                      alt="Thumbnail"
                    />
                  </div>
                )}
              </div>

              <br />
              <ValidationTextField
                style={{ marginBottom: 20 }}
                sm={8}
                id="outlined-required"
                label="제목"
                value={title}
                onChange={handleChangeTitle}
              />
              <ValidationTextField
                style={{ marginBottom: 30 }}
                sm={8}
                id="outlined-required"
                label="설명"
                value={Description}
                onChange={handleChangeDecsription}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ColorButton
                  variant="outlined"
                  type="submit"
                  onClick={onSubmit}
                >
                  저장
                </ColorButton>
                <ColorButton
                  variant="outlined"
                  type="submit"
                  onClick={() => navigate("/")}
                  style={{ marginLeft: "10px" }}
                >
                  취소
                </ColorButton>
              </div>
            </Form>
          </div>
        </UploadGlass>
      </Container>
    </>
  );
}

export default VideoUploadPage;

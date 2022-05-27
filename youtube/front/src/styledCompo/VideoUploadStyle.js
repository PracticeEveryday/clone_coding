import styled from "styled-components";
import { LoginGlass, TitleText } from "./LoginStyle";
import { Button } from "@mui/material";

//업로드 타이틀
export const UploadTitle = styled(TitleText)`
  padding-top: 20px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  font-size: 50px;
  color: black;
`;

// 업로드 글래스

export const UploadGlass = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column; */
  background-color: green;
  width: 900px;
  height: 700px;

  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 2.73186px 20.489px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20.489px);

  border-radius: 27.3186px;
`;

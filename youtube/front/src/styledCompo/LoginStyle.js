import styled from "styled-components";
import { Button } from "@mui/material";

//헬퍼텍스트
export const RedSpan = styled.span`
  color: #f03e3e;
`;

//로그인 글라스 효과
export const LoginGlass = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  background-color: green;
  width: 900px;
  height: 500px;

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

// 로그인 페이지의 Login text
export const TitleText = styled.h1`
  font-weight: 800;
  font-size: 50px;

  margin-bottom: 50px;
  color: black;
`;

//Sign-up, ForgetPassword Container
export const SignPWContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

//ForgetPassword btn
export const ForgetPw = styled(Button)`
  font-style: italic;
  width: 280px;
`;

// Sign-up btn
export const SignBtn = styled(ForgetPw)`
  width: 290px;
`;

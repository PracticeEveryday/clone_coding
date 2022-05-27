import styled from "styled-components";
import { LoginGlass, TitleText } from "./LoginStyle";
import { Button } from "@mui/material";

//회원가입 타이틀
export const RegisterTitle = styled(TitleText)`
  padding-top: 50px;
  padding-bottom: 30px;
  margin-bottom: 10px;
  font-size: 30px;
  color: black;
`;

// 회원가입 글래스
export const RegisterGlass = styled(LoginGlass)`
  height: 600px;
  justify-content: flex-start;
`;

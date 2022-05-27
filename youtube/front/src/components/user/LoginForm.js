import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Api from "../../api";
// Mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import { validateEmail } from "../../helpers/index";

// import recoil
import { useSetRecoilState, useRecoilState } from "recoil";
import { tokenState, userState, userInfoState } from "../../atom";

// import styled compo
import { ValidationTextField, ColorButton } from "../../styledCompo/muiCustom";
import {
  LoginGlass,
  TitleText,
  ForgetPw,
  SignPWContainer,
  SignBtn,
} from "../../styledCompo/LoginStyle";

const LoginForm = () => {
  const navigate = useNavigate();

  //@ 전역 유저 정보
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  // input 상태관리
  const [checkLogin, setCheckLogin] = useState(true);

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  ///@ 로그인 시 작동하는 함수(post 요청)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("login", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      setToken(user.accessToken);
      setUser(user);
      setUserInfo(user);
      const jwtToken = user.accessToken;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      console.log("user==>", user, "token===>", user.accessToken);
      console.log("UserInfo==>", userInfo);
      sessionStorage.setItem("userToken", jwtToken);

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      if (
        err.response.data.errorMessage ===
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      ) {
        alert("Passwords do not match. Please check again.");
      } else if (
        err.response.data.errorMessage ===
        "가입 내역이 없는 이메일입니다. 다시 한 번 확인해 주세요."
      ) {
        alert("This email has no subscription history. Please check again.");
      }
    }
  };

  return (
    <div>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 220,
        }}
      >
        <LoginGlass>
          <form
            action="/"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexFlow: "column",
              marginBottom: 40,
            }}
          >
            {/* ///@ 타이틀 */}
            <TitleText>Login</TitleText>
            <Box
              sx={{
                width: "438px",
              }}
              noValidate
              autoComplete="off"
            >
              {/* ///@ 이메일 input */}
              <ValidationTextField
                style={{ marginBottom: 10 }}
                sm={8}
                autoFocus
                // {!checkLogin && error}
                helperText={
                  (!isEmailValid && (
                    <span>The email format is not valid.</span>
                  )) ||
                  (!checkLogin && <span>Invalid email.</span>)
                }
                id="outlined-required"
                label="Email Address"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                // defaultValue="Hello World"
              />
              <br></br>
              {/* ///@ 비밀번호 input */}
              <ValidationTextField
                // style={{ width: 438 }}
                helperText={
                  (!isPasswordValid && (
                    <span> Password is more than 4 characters. </span>
                  )) ||
                  (!checkLogin && <span>Invalid password.</span>)
                }
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br></br>

              {/* ///@ 회원가입버튼 & 비밀번호 찾끼 */}
              <SignPWContainer>
                <SignBtn
                  sx={{ fontSize: 16 }}
                  color="success"
                  onClick={() => navigate("/register")}
                  style={{ marginRight: 230 }}
                >
                  Sign-up
                </SignBtn>
              </SignPWContainer>
              {/* ///@ 버튼들 */}
              <Stack
                spacing={1}
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ColorButton
                  variant="outlined"
                  type="submit"
                  disabled={!isFormValid}
                  onClick={handleSubmit}
                >
                  Sign-in
                </ColorButton>

                <ColorButton variant="outlined" onClick={() => navigate("/")}>
                  Back
                </ColorButton>
              </Stack>
            </Box>
          </form>

          <Box
            sx={{
              width: "438px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexFlow: "column",
            }}
          ></Box>
        </LoginGlass>
      </Container>
    </div>
  );
};

export default LoginForm;

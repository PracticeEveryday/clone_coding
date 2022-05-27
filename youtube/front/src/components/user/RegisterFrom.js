import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { useAlert } from 'react-alert';

import Container from "@mui/material/Container";

import { validateEmail } from "../../helpers/index";

import * as Api from "../../api";

// Mui
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";

// import styled compo
import { ValidationTextField, ColorButton } from "../../styledCompo/muiCustom";

import { RegisterGlass, RegisterTitle } from "../../styledCompo/RegisterStyle";
import { RedSpan } from "../../styledCompo/LoginStyle";

const RegisterFrom = () => {
  const navigate = useNavigate();

  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  // const Alert = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.post("register", {
        email,
        name,
        password,
      });

      // 로그인 페이지로 이동함.
      navigate("/login");
      alert("You have successfully registered as a member.");
    } catch (err) {
      alert("This email is currently in use. Please enter another email.");
    }
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  ///@ 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  return (
    <div>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "column",
          marginTop: 160,
        }}
      >
        <RegisterGlass>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexFlow: "column",
            }}
          >
            {" "}
            <RegisterTitle>Register</RegisterTitle>
            <Box
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "560px",
                },
              }}
              autoComplete="off"
            >
              {/* ///@ 이메일 */}
              <div
                style={{
                  "@media (maxWidth: 766px)": {
                    width: "auto",
                  },
                }}
              >
                <ValidationTextField
                  autoFocus
                  required
                  id="outlined-required"
                  label="Email Address"
                  autoComplete="email"
                  helperText={
                    !isEmailValid && (
                      <RedSpan>The email format is not valid.</RedSpan>
                    )
                  }
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  style={{ marginBottom: 20 }}
                />

                {/* ///@ 비밀번호 */}
                <ValidationTextField
                  required
                  // error={!checkLogin}
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  helperText={
                    !isPasswordValid && (
                      <RedSpan> Password is more than 4 characters. </RedSpan>
                    )
                  }
                  onChange={(e) => {
                    setPassword(e.target.value);
                    // setCheckLogin(true);
                  }}
                  style={{ marginBottom: 20 }}
                />
                <br></br>
                {/* ///@ 비밀번호 확인 */}
                <ValidationTextField
                  required
                  // error={!checkLogin}
                  label="Confirm Password"
                  type="password"
                  autoComplete="current-password"
                  value={confirmPassword}
                  helperText={
                    !isPasswordSame && (
                      <RedSpan> Passwords do not match. </RedSpan>
                    )
                  }
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    // setCheckLogin(true);
                  }}
                  style={{ marginBottom: 20 }}
                />
                <br></br>
                {/* ///@ 닉네임 */}
                <ValidationTextField
                  required
                  label="Name"
                  helperText={
                    !isNameValid && (
                      <RedSpan>
                        Please set the name at least 2 characters.
                      </RedSpan>
                    )
                  }
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    // setCheckLogin(true);
                  }}
                />
              </div>
              <Stack
                spacing={1}
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                style={{ marginTop: 40 }}
              >
                {/* ///@ 버튼들 */}
                <ColorButton
                  variant="outlined"
                  style={{ width: "35%" }}
                  disabled={!isFormValid}
                  onClick={handleSubmit}
                >
                  Sign-up
                </ColorButton>
                <ColorButton
                  variant="outlined"
                  style={{ width: "35%" }}
                  onClick={() => navigate("/login")}
                >
                  Back
                </ColorButton>
              </Stack>
            </Box>
          </form>
        </RegisterGlass>
      </Container>
    </div>
  );
};

export default RegisterFrom;

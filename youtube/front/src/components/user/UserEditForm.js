import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import recoil
import { useSetRecoilState, useRecoilState } from "recoil";
import { tokenState, userState, userInfoState } from "../../atom";

import * as Api from "../../api";

// import { useAlert } from 'react-alert';
import Container from "@mui/material/Container";

// Mui
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";

// import styled compo
import { ValidationTextField, ColorButton } from "../../styledCompo/muiCustom";

import { RegisterGlass, RegisterTitle } from "../../styledCompo/RegisterStyle";
import { RedSpan } from "../../styledCompo/LoginStyle";

const RegisterFrom = () => {
  //@ 전역 유저 정보

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [editUser, setEditUser] = useState(userInfo);

  const navigate = useNavigate();

  console.log(userInfo);
  // console.log(setUser);

  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.put("login", {
        email: userInfo.email,
        name: editUser.name,
        userId: userInfo._id,
      });

      // 로그인 페이지로 이동함.
      navigate("/login");
      alert("You have successfully changed your account.");
    } catch (err) {
      alert("failed.");
    }
  };

  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = editUser.name.length >= 2;

  ///@ 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isNameValid;

  //회원탈퇴
  const userDelete = async (e) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await Api.delete("login");
      await navigate("/main");
    } else return;
  };

  return (
    <div>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "column",
          paddingTop: 250,
        }}
      >
        <RegisterGlass style={{ height: "400px" }}>
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
            <RegisterTitle>Edit</RegisterTitle>
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
                  value={editUser.email}
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
                  value={editUser.name}
                  onChange={(e) => {
                    setEditUser((prev) => ({ ...prev, name: e.target.value }));
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
                  //   disabled={!isFormValid}
                  onClick={handleSubmit}
                >
                  확인
                </ColorButton>
                <ColorButton
                  variant="outlined"
                  style={{ width: "35%" }}
                  onClick={() => navigate("/login")}
                >
                  취소
                </ColorButton>
                <ColorButton
                  variant="outlined"
                  style={{
                    width: "35%",
                    fontSize: "1.2rem",
                    lineHeight: "1.1",
                  }}
                  onClick={() => navigate("/pwEdit")}
                >
                  비밀번호 <br />
                  변경
                </ColorButton>
                <ColorButton
                  variant="contained"
                  style={{
                    width: "35%",
                    backgroundColor: "#ffb400",
                    fontSize: "1.3rem",
                  }}
                  onClick={userDelete}
                >
                  회원탈퇴
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

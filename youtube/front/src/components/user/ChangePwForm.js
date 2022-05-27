import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import recoil
import { useSetRecoilState, useRecoilState } from 'recoil';
import { tokenState, userState, userInfoState } from '../../atom';

import * as Api from '../../api';

// import { useAlert } from 'react-alert';
import Container from '@mui/material/Container';

// Mui
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';

// import styled compo
import { ValidationTextField, ColorButton } from '../../styledCompo/muiCustom';

import { RegisterGlass, RegisterTitle } from '../../styledCompo/RegisterStyle';
import { RedSpan } from '../../styledCompo/LoginStyle';

const RegisterFrom = () => {
  //@ 전역 유저 정보

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [editUser, setEditUser] = useState(userInfo);

  const navigate = useNavigate();

  console.log('유저정보', userInfo);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');

  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = currentPassword.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = newPassword === newPasswordCheck;

  ///@ 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isPasswordValid && isPasswordSame;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('currentPassword', currentPassword);
      console.log('email', userInfo.email);
      const res = await Api.post('login', {
        email: userInfo.email,
        password: currentPassword,
      });
      console.log('res', res);
      console.log('res.data', res.data);
      console.log('res.data.result', res.status);
      if (res.status === 200) {
        await Api.put('login', {
          email: userInfo.email,
          password: newPassword,
        });
        alert('비밀번호 변경 완료!');
        navigate('/login');
      } else {
        alert('현재 비밀번호가 일치하지 않습니다');
      }
    } catch (error) {
      console.log('error');
    }
  };
  return (
    <div>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexFlow: 'column',
          paddingTop: 250,
        }}
      >
        <RegisterGlass style={{ height: '580px' }}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexFlow: 'column',
            }}
          >
            {' '}
            <RegisterTitle>Password Edit</RegisterTitle>
            <Box
              sx={{
                '& > :not(style)': {
                  m: 1,
                  width: '560px',
                },
              }}
              autoComplete="off"
            >
              {/* ///@ 이메일 */}
              <div
                style={{
                  '@media (maxWidth: 766px)': {
                    width: 'auto',
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
                {/* ///@ 비밀번호 */}
                <ValidationTextField
                  required
                  // error={!checkLogin}
                  id="outlined-password-input"
                  label="현재 비밀번호"
                  type="password"
                  autoComplete="current-password"
                  value={currentPassword}
                  helperText={
                    !isPasswordValid && <RedSpan> Password is more than 4 characters. </RedSpan>
                  }
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                  style={{ marginBottom: 20 }}
                />
                <br></br>
                {/* ///@ 비밀번호 확인 */}
                <ValidationTextField
                  required
                  // error={!checkLogin}
                  label="새 비밀번호"
                  type="password"
                  autoComplete="current-password"
                  value={newPassword}
                  helperText={!isPasswordSame && <RedSpan> Passwords do not match. </RedSpan>}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    // setCheckLogin(true);
                  }}
                  style={{ marginBottom: 20 }}
                />
                <ValidationTextField
                  required
                  // error={!checkLogin}
                  label="새 비밀번호 확인"
                  type="password"
                  autoComplete="current-password"
                  value={newPasswordCheck}
                  helperText={!isPasswordSame && <RedSpan> Passwords do not match. </RedSpan>}
                  onChange={(e) => {
                    setNewPasswordCheck(e.target.value);
                    // setCheckLogin(true);
                  }}
                  style={{ marginBottom: 20 }}
                />
              </div>
              <Stack
                spacing={1}
                direction="row"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                style={{ marginTop: 40 }}
              >
                {/* ///@ 버튼들 */}
                <ColorButton variant="outlined" style={{ width: '35%' }} onClick={handleSubmit}>
                  확인
                </ColorButton>

                <ColorButton
                  variant="outlined"
                  style={{ width: '35%' }}
                  onClick={() => navigate('/userEdit')}
                >
                  취소
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../api';
import Home from '../src/components/home/Home';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tokenState, userInfoState, userState } from '../atoms';

function Validation() {
  const navigate = useNavigate();

  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const token = useRecoilValue(tokenState);
  const user = useRecoilValue(userState);
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    const fetchOwner = async (ownerId) => {
      // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
      const res = await Api.get('users', ownerId);
      // 사용자 정보는 response의 data임.
      const ownerData = res.data;
      setUserInfo(ownerData);
      // fetchOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
      setIsFetchCompleted(true);
    };

    if (token) {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      let ownerId = '';
      if (user.id) {
        ownerId = user.id;
      } else if (user._id) {
        ownerId = user._id;
      } else {
        console.error('아이디를 가져오지 못했습니다.');
      }
      // 해당 유저 id로 fetchOwner 함수를 실행함.

      fetchOwner(ownerId);
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate, setUserInfo, token, user._id, user.id]);

  if (!isFetchCompleted) {
    return 'loading...';
  }

  return (
    <>
      <Home />
    </>
  );
}

export default Validation;

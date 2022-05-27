import React, { useState, useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../front/src/atom';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import {
  HeaderContainer,
  HeaderLogo,
  HeaderLeftContainer,
  Upload,
} from '../src/styledCompo/HeaderStyle';
import Logo from '../src/components/Img/Logo.png';

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderContainer>
        {/* <HeaderLeftContainer> */}
        <HeaderLogo src={Logo} />
        <Upload onClick={() => navigate('/', { replace: true })}>Upload</Upload>
        {/* </HeaderLeftContainer> */}
      </HeaderContainer>
    </>
  );
};

export default Header;

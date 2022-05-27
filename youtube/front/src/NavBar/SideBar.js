import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, userInfoState, tokenState } from '../../src/atom'
import * as api from '../api'
import 'antd/dist/antd.css';
import { Row, Col, Layout, Menu } from 'antd';
import {
  HomeOutlined,
  InboxOutlined,
  YoutubeOutlined,
  LikeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UploadOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const { Header, Sider } = Layout;

const SideBar = () => {
  
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(false)
  const userToken = sessionStorage.getItem('userToken')
    
  const UserState = useRecoilValue(userState)
  const setUserState = useSetRecoilState(userState)
  const setTokenState = useSetRecoilState(tokenState)
  const setUserInfostate = useSetRecoilState(userInfoState)
    
  const stateInitialization = () => {
  
    if(!userToken) {
      setUserState({ user: null }) 
      setTokenState({ token: null })  
      setUserInfostate(undefined)  
      } else {
        setLoginState(true)
      }
      
    } 

    useEffect(stateInitialization, [])

    const [videoList, setVideoList] = useState([])
  
    const userId = useRecoilValue(userState)._id

    useEffect(() => {
      try {
        api.post("video/getSubscriptionVideos", { 
          userId: userId }).then((res) => setVideoList(res.data))
    } catch(err) {
        console.log(err.message)}
    }, [userId])

    let defaultNameList = []
    let defaultIdList = []
    let subScribingNameList = []
    for (let i=0; i<videoList.length; i++) {
      if((defaultIdList.indexOf(videoList[i].writer._id)) === -1){ 
          defaultIdList.push(videoList[i].writer._id)
          defaultNameList.push(videoList[i].writer.name)
          const element = getItem(videoList[i].writer.name, `/subscribePage/${videoList[i].writer._id}`)
          subScribingNameList.push(element)
    }
  } 
    
  const items = [
    getItem('홈', '/', <HomeOutlined />),
    getItem('보관함', '/myVideoPage', <InboxOutlined />),
    getItem('좋아요 동영상', '/likeVideoPage', <LikeOutlined />),
    getItem('구독', 'sub1', <YoutubeOutlined />, subScribingNameList),
  ];

  const items2 = [
    loginState ? getItem('로그아웃', '/logout', <LogoutOutlined />) : getItem('로그인', '/login', <LoginOutlined />),
    getItem('업로드', '/video/upload', <UploadOutlined />),  
    getItem('회원가입', '/register', <CustomerServiceOutlined />),
    getItem('회원정보 변경', '/userEdit', <InboxOutlined/>),
   ];


  const onClick = (e) => {
    if (!loginState & (e.key === '/myVideoPage' || e.key === '/myVideoPage' || e.key === '/likeVideoPage' || e.key === '/subscribePage' || e.key === '/video/upload' || e.key === '/userEdit' )) {
      navigate("/alertPage")
    }  
    else if ( e.key !== '/logout' ) {
      navigate(e.key)
    } else {
      sessionStorage.removeItem('userToken')
      setLoginState(false)
      alert('로그아웃 되셨습니다!')
    }        
  };


  return (
  
    <>
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: 'auto',
            position: 'fixed',
            paddingTop: 60,
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={items}
            onClick={onClick}
          />
        </Sider>
      </Layout>

      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            position: 'relative',
            minWidth: '900px',
          }}
        >
          <Row>
          <Col flex="auto"><span style={{color:"whitesmoke"}}>{loginState && `${UserState.name}님 환영합니다!`}</span></Col>
            <Col flex="485px">
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['4']}
                items={items2}
                onClick={onClick}
              />
            </Col>
          </Row>
        </Header>
      </Layout>
    </>
  );
};

export default SideBar;

import React, {useState, useEffect} from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, userInfoState, tokenState } from '../../src/atom'
import * as api from '../api'
import 'antd/dist/antd.css'; 
import { Layout, PageHeader, Card, Button } from 'antd';
import { LikeOutlined, PlusSquareOutlined } from '@ant-design/icons';

const { Content } = Layout;

const { Meta } = Card;

const cardStyle = {
  width: '23%',
  height: '23%',
  marginLeft: '1%',
  marginRight: '1%',
  marginTop: '1%',
  marginBottom: '1%',

}

const cardimageStyle = {
  width: '100%',
  height: '280px',
  marginBottom: '3%',
}



const Home = () => {

  const userToken = sessionStorage.getItem('userToken')
  const [loginState, setLoginState] = useState(false)
  
  const UserState = useRecoilValue(userState)
  const setUserState = useSetRecoilState(userState)
  const setTokenState = useSetRecoilState(tokenState)
  const setUserInfostate = useSetRecoilState(userInfoState)
  
  const stateInitialization = () => {

    if(!userToken) {
      setUserState({ user: null }) 
      setTokenState({ token: null })  
      setUserInfostate(undefined)  
      console.log('userToken이 없다면 이 값이 undefined 나옵니다 =====>>>>', UserState.name )
    } else {
      console.log('회원님의 이름은', UserState.name)
      setLoginState(true)
    }
  } 
  useEffect(stateInitialization, [userToken ,setUserState, setTokenState, setUserInfostate, UserState.name])

  

  /* 영상리스트 저장을 위한 useState
   Api, 영상 전체 받아옴, videoList에 저장함. [getVideoList Api] 
   getVideoList 함수가 랜더링시 실행되게 함. */

  const [videoList, setVideoList] = useState('')
   
  const downloadVideo = useEffect(() => {
    api.get('video/getVideos').then(res => setVideoList(res.data.videos))
  }, [])

  
  /* map함수 */

  const mapVideo = videoList && 
  
    videoList.map((video, index) => {    
    const videoId = video.id
    const writerId = video.writer.id
    const title = video.title
    const description = video.description
    const filePath = video.filePath.substring(8)
    const thumbnail = video.thumbnail
    const updatedAt = video.updatedAt
    console.log(videoList)

    return (

      <Card.Grid
        style={cardStyle}
        className='videoBox'
        hoverable
        key={videoId}
        >
        
        <embed type="video/webm" src={`http://localhost:3001/${filePath}`} style={cardimageStyle}>   
        </embed>

        <Meta title={<div style={{marginRight: "24px"}}>{title}</div>} description={<div style={{marginRight: "24px"}}>{description}</div>} 
          avatar={ <div style={{width: "8px"}}>
                    <LikeOutlined /> 
                    <PlusSquareOutlined />
                  </div>}/>
      </Card.Grid>

)})



// ------------------------------- 아래는 컴퍼넌트  --------------------------//


return (

  <Content
  style={{
    marginLeft: '216px',
    marginTop: '16px',
    marginRight: '16px',
    overflow: 'initial',
  
  }}
>
  <div
    className="site-layout-background"
    style={{
      padding: 0,
      textAlign: 'center',
    }}
  >

  <PageHeader
    className="subscribe-page-header"
    ghost={false}
    title="좋아요"
    subTitle="총 3개"
    avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
    extra={[]}
  />
  <Card>  
    {/* 아래는 맵함수  */}
    {mapVideo}
  </Card>  
  </div>
  </Content>
)}

export default Home
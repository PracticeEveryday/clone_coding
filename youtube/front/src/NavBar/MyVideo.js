import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, userInfoState, tokenState } from '../../src/atom'
import * as api from '../api'
import 'antd/dist/antd.css'; 
import { Layout, PageHeader, Card, Button, Avatar } from 'antd';
import {
  DeleteTwoTone,
  DeleteFilled,
  DeleteOutlined
} from '@ant-design/icons';

const { Content } = Layout;

const { Meta } = Card;

const cardStyle = {
  width: '420px',
  marginLeft: '20px',
  marginRight: '20px',
  marginTop: '20px',
  marginBottom: '20px',
}

const cardimageStyle = {
  width: '100%',
  height: '280px',
  marginBottom: '3%',
  objectFit: 'cover',
  cursor: 'pointer'
}



const LikeVideo = () => {

  const navigate = useNavigate()

  // 영상리스트 저장을 위한 useState, 아래는 예시 데이터.

  const [videoList, setVideoList] = useState([])
  const [latestdeleteId, setLatestdeletedId] = useState('')
  const userId = useRecoilValue(userState)._id
  const userName = useRecoilValue(userState).name

  useEffect(() => {
    api.post("video/getVideoByWriter", {
      userId: userId 
    })
      .then((res) => setVideoList(res.data.video))
  }, [userId, latestdeleteId])

  // map함수 

  const mapVideo = videoList && 
  
    videoList.map((video, index) => {  
      const video_Id = video?._id.replace(/(\s*)/g, "")
      const writerId = video.writer.id
      const title = video.title
      const description = video.description
      const avatar = video.writer.avatar
      const filePath = video.filePath.substring(8)
      const thumbnail = video.thumbnail
      const updatedAt = video.updatedAt
      const deleteVideo = (e) => {
          api.delete(`video/deleteVideo/${video_Id}`)
          .then((res) => { if (res.data.status === 'success') {
            setLatestdeletedId(video_Id)
          }})
            
        }
      
  
  return (

  <Card.Grid
    style={cardStyle}
    className='videoBox'
    hoverable
    key = {index}
    >
  <img style={cardimageStyle} src={`http://localhost:3001/${thumbnail}`} alt="썸네일" onClick={(e) => navigate(`/video/${video_Id}`)} /> 

  <Meta style={{paddingRight: "36px"}} title={title} description={description} 
      avatar={<Button onClick={deleteVideo} type="primary" icon={<DeleteFilled /> } shape='circle' size='middle' ghost danger/>} />
  </Card.Grid>
  

)})




// ------------------------------- 아래는 컴퍼넌트  --------------------------//


return (

  <Content
  style={{
    minWidth: '1200px',
    marginLeft: '216px',
    marginTop: '16px',
    marginRight: '16px',
    position: 'relative',
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
    title='나의 동영상'
    subTitle={`${videoList.length}개`}
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

export default LikeVideo
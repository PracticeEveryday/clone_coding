import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../src/atom'
import * as api from '../api'
import 'antd/dist/antd.css'; 
import { Layout, PageHeader, Card, Button } from 'antd';

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


const SubScribe = () => {

  const navigate = useNavigate()

  /* 영상리스트 저장을 위한 useState, 아래는 예시 데이터. */

  const { subscribingId } = useParams()
  const Id = subscribingId
  const [videoList, setVideoList] = useState([])
  const [videoWirterName, setvideoWirterName] = useState('')
  const [videoWriterId, setVideoWriterId] = useState('')
  const [subScribeNum, setSubScribeNum] = useState(0)
  const userId = useRecoilValue(userState)._id

  /* 구독 취소 함수 */

  const handleUnsubscribe = async (e) => {
  await api.post("unsubscribe", {
    userTo: videoWriterId,
    userFrom: userId,
    }).then(() => {
      alert('구독이 취소되었습니다') 
      navigate("/")});  
  }


  useEffect(() => {
    api.post("video/getVideoByWriter", {
      userId: Id 
    })
      .then((res) => {
        setVideoList(res.data.video)
        setvideoWirterName(res.data.video[0].writer.name)
        setVideoWriterId(res.data.video[0].writer._id)
        return res.data.video[0].writer._id})
      .then(res => api.post("subscriberNum", { userTo: res }))
      .then(res => setSubScribeNum(res.data.subscriberNum))
    }, [Id])







  /* map함수 */

  const mapVideo = videoList &&
  
    videoList.map((video, index) => {  
    
      const video_Id = video._id.replace(/(\s*)/g, "")
      const writerId = video.writer.id
      const title = video.title
      const description = video.description
      const filePath = video.filePath
      const thumbnail = video.thumbnail
      const updatedAt = video.updatedAt 
  
  return (

  <Card.Grid
    style={cardStyle}
    className='videoBox'
    hoverable
    key={video_Id}
    >
  
  <img style={cardimageStyle} src={`http://localhost:3001/${thumbnail}`} alt="썸네일" onClick={(e) => navigate(`/video/${video_Id}`)} />   

  <Meta title={title} description={description}/>
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
        title={videoWirterName}
        subTitle={`구독자 ${subScribeNum}명`}
        avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
        extra={[
          <Button key="1" type="primary" onClick={handleUnsubscribe}>
            구독 취소
          </Button>, 
        ]}
      />
      <Card>  
        {/* 아래는 맵함수  */}
        {mapVideo}
      </Card>  
    </div>
  </Content>
         
  )
}

export default SubScribe


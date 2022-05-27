import 'antd/dist/antd.css'; 
import { Layout, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { YoutubeOutlined } from '@ant-design/icons';
const { Content } = Layout


const Alert = () => {

  const navigate = useNavigate()

  const iconStyle = {

    width: '100px',
    height: '100px',
    
  }

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
    
          <Card title="로그인이 필요한 서비스입니다." size="default" >  

          <Button className='alertButton' onClick={(event) => navigate('/login')}>로그인</Button>
          </Card>  
        </div>
      </Content>
  
  )

}

export default Alert
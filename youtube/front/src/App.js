import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../src/components/home/Home';
import RegisterForm from '../src/components/user/RegisterFrom';
import LoginForm from '../src/components/user/LoginForm';
import UserEditForm from '../src/components/user/UserEditForm';
import ChangePwForm from '../src/components/user/ChangePwForm';
import VideoDetailPage from './components/video/VideoDetailPage';
import VideoList from './components/video/VideoList';
import SubScribePage from './NavBar/SubscribePage';
import LikeVideoPage from './NavBar/LikeVideoPage';
import MyVideoPage from './NavBar/MyVideoPage';
import AlertPage from './NavBar/AlertPage';
import VideoUploadPage from './components/VideoUploadPage/VideoUploadPage';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/userEdit" element={<UserEditForm />} />
      <Route path="/pwEdit" element={<ChangePwForm />} />
      <Route path="/video/:id" element={<VideoDetailPage />} />
      <Route path="/videoList" element={<VideoList />} />
      <Route path="/subscribePage/:subscribingId" element={<SubScribePage />} />
      <Route path="/likeVideoPage" element={<LikeVideoPage />} />
      <Route path="/myVideoPage" element={<MyVideoPage />} />
      <Route path="/videoList" element={<VideoList />} />
      <Route path="/alertPage" element={<AlertPage />} />
      <Route path="/video" element={<LandingPage />} />
      <Route path="/video/upload" element={<VideoUploadPage />} />

      {/* <Route path="*" element={<Home />} /> */}
    </Routes>
  );
}

export default App;



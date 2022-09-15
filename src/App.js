import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './App.css';
import MainPage from './pages/MainPage.js';
import MyPage from './pages/MyPage.js';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import SearchBar from './components/SearchBar';
import ConsultingPage from './pages/Consulting/ConsultingPage';
import CommunityPage from './pages/Community/CommunityPage';
import CommunityUploadPage from './pages/Community/CommunityUploadPage';
import ClubPage from './pages/Club/ClubPage';
import ClubUploadPage from './pages/Club/ClubUploadPage';
import LecturePage from './pages/Lecture/LecturePage';
import LectureUploadPage from './pages/Lecture/LectureUploadPage';
import MentoringPage from './pages/Mentoring/MentoringPage';
import MentoringUploadPage from './pages/Mentoring/MentoringUploadPage';
import MentoringDetailPage from './pages/Mentoring/MentoringDetailPage';
import LectureDetailPage from './pages/Lecture/LectureDetailPage';
import ClubDetailPage from './pages/Club/ClubDetailPage';
import ClubPictureUploadPage from './pages/Club/ClubPictureUploadPage';
import ClubGalleryDetail from './pages/Club/ClubGalleryDetail';
import Chat from './services/Chat';
import PostDetailPage from './pages/PostDetailPage';


const App = () => {
  
// console.log('______                            _   ');
// console.log('| ___ ＼          _              | |  ');
// console.log('| |_/  /    ___  (_)  __ _   ___ | |_ ');
// console.log('|     /   /  _ ＼    / _` | / __|| __|');
// console.log('|  |＼＼  |  __/  _ | (_| || (__ | |_ ');
// console.log('＼_| ＼_| ＼___| (_) ＼__,_| ＼___| ＼__|');
// console.log('%c 금오공대 멋쟁이 사자처럼', 'font-size:50px; color:orange;');
// console.log('%c @likelionkumoh', 'font-size:25px; color:orange;');
// console.log('%c https://www.instagram.com/likelionkumoh/', 'font-size:25px;')

  const showDevice = useMediaQuery({
    query : "(min-width:420px)"
  });

  return (
    <section className='appcontainer'>
      {showDevice
      ?
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/my" element={<MyPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path='/search' element={<SearchBar/>}/>
        <Route path='/lecture/*' element={<Lecture/>}/>
        <Route path='/mentoring/*' element={<Mentoring/>}/>
        <Route path='/club/*' element={<Club/>}/>
        <Route path='/community/*' element={<Community/>}/>
        <Route path='/consulting' element={<ConsultingPage/>}/>
        <Route path="*" element={<div>404</div>}/>
      </Routes>
      :
      <div id='none-show-screen'>해상도를 높여주세요 !</div>
      }
    </section>
  );
};

export default App;

function Lecture() {
  return (
      <Routes>
          <Route path='' element={<LecturePage/>}/>
          <Route path='upload' element={<LectureUploadPage/>}/>
          <Route path='detail' element={<LectureDetailPage/>}/>
      </Routes>
  );
};

function Mentoring() {
  return (
    ///mentoring/* => 와일드 카드 형태, 라우터 중첩시 사용
      <Routes>
          <Route path='' element={<MentoringPage/>}/>
          <Route path='upload' element={<MentoringUploadPage/>}/>
          <Route path='detail/:id' element={<MentoringDetailPage/>}/>
          <Route path='detail/:id/room/:id' element={<Chat/>}/>
      </Routes>
  );
};

function Club() {
  return (
      <Routes>
          <Route path='' element={<ClubPage/>}/>
          <Route path='detail/:clubId' element={<ClubDetailPage />} />
          <Route path='upload' element={<ClubUploadPage/>}/>
          <Route path='/detail/:clubId/pictureUpload' element={<ClubPictureUploadPage />} />
          <Route path='/detail/:clubId/articleUpload' element={<CommunityUploadPage />} />
          <Route path='/detail/:clubId/galleryDetail' element={<ClubGalleryDetail />} />
      </Routes>
  );
};

function Community() {
  return (
      <Routes>
          <Route path='' element={<CommunityPage/>}/>
          <Route path='upload' element={<CommunityUploadPage/>}/>
          <Route path='/:id' element={<PostDetailPage />} />
      </Routes>
  );
};
import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import "../../style/pages/Club/ClubDetailPage.css"
// import {PROXY} from '../../data/serverUrl';
import axios from 'axios';
import ClubInfo from './../../components/ClubPage/ClubInfo';
import ClubBoard from './../../components/ClubPage/ClubBoard';
import Header from './../../components/Header';
import Navbar from './../../components/Navbar';
import ClubChat from '../../components/ClubPage/ClubChat';
import ClubGallery from '../../components/ClubPage/ClubGallery';


const ClubDetailPage = () => {
    const PROXY = process.env.REACT_APP_PROXY;
    let params = useParams();
    const navigate = useNavigate();

    const [detailData, setDetailData] = useState([])

    // axios(`${PROXY}/club/${params.clubId}`) => 특정 동호회의 정보를 가져오기 위한 axios 
    // axios(`${PROXY}/club/${params.clubId}/articles`) => 특정 동호회의 게시글 가져오기 위한 axios 
    // 특정 동호회 정보, 게시글을 가져온 후 각 컴포넌트의 props 로 넘겨준다


    const goPhotoUpload = () => {
        navigate('pictureUpload');
    }

    useEffect(() => {
        axios.get(`${PROXY}/clubs/${params.clubId}/`)
        .then((res) => {
            console.log(res)
            setDetailData(res.data)
        })
        .catch((err) => {
            alert("디테일 페이지 에러")
        })
    }, [])

    console.log(detailData)

    return (
        <section className='ClubDetailPage'>
            <Header/>
            <Navbar val={'club'}/>
            <div className='clubDeailContainer'>
                <div className='clubDetailLeft'>
                    <div><ClubInfo params={params} name={detailData.name} member={detailData.member} image={detailData.image}/></div>
                    <div className='clubImageUploadBtn' onClick={goPhotoUpload}><img src={`${process.env.PUBLIC_URL}/img/Teacher.png`} alt=''/>사진 업로드하기</div>
                </div>
                <div className='clubDetailCenter'>
                    <ClubBoard />
                </div>
                <div className='clubDetailRight'>
                    <ClubChat />
                    <ClubGallery />
                </div>
            </div>
        </section>
    );
};

export default ClubDetailPage;
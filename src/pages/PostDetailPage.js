import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../style/pages/PostDetailPage.css';
import Header from '../components/Header.js';
import Navbar from '../components/Navbar';
import DetailRepleBox from '../components/CommunityPage/DetailRepleBox';
import axios from 'axios';
// import { PROXY } from '../data/serverUrl';
import { useNavigate } from 'react-router-dom';

const PostDetailPage = () => {
    const PROXY = process.env.REACT_APP_PROXY;
    const {id} = useParams();
    const navigate = useNavigate();
    const [detailInfo, setDetailInfo] = useState({});
    const [profileImg, setProfileImg] = useState('');

    // 게시물 수정
    const clickModify = (e) => {
        if(window.confirm('해당 글을 수정하시겠습니까 ?')) {
            // 수정
        }
    }

    // 게시물 삭제
    const clickDelete = (e) => {
        if(window.confirm('해당 글을 삭제하시겠습니까 ?')) {
            axios.delete(`${PROXY}/community/${id}/`, {
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('react_accessToken')
                  }
              })
            .then((res) => {
                console.log(res);
                navigate('/community');
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    // 게시물 조회 & 유저 이미지 조회
    useEffect(() => {
        
        const getDetail = axios.get(`${PROXY}/community/${id}/`)
        getDetail.then((res) => {
            console.log(res.data);
            setDetailInfo(res.data);
        })
        .catch((err) => {
            console.log(err);
        })

        // writer id로 통신하게 추후 변경
        const getUserData = axios.get(`${PROXY}/accounts/${localStorage.getItem('react_userId')}/update/`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('react_accessToken')
            }
        })
        getUserData.then((res) => {
            setProfileImg(res.data.image);
        })
        .catch((err) => {
            console.log(err);
        })

        
    }, []);

    return (
        <section className='PostDetailPage'>
            <Header/>
            <Navbar val={"community"}/>
            <div className='post-detail-container'>
                <div id='post-detail-content'>
                    <div>{detailInfo.category}</div>
                    <div id='post-detail-writer-box'>
                        <img src={profileImg} alt='x'/>
                        <div>{detailInfo.writer_id} <br/>{detailInfo.create_time && detailInfo.create_time.substr(0, 10)}</div>
                        {detailInfo.writer_id === localStorage.getItem('react_nickname') &&
                            <div id='detail-btns'>
                                <button onClick={clickModify}>수정</button>
                                <button onClick={clickDelete}>삭제</button>
                            </div>}
                    </div>
                    <div>{detailInfo.title}</div>
                    <div>{detailInfo.description}</div>
                    <br/><img src={detailInfo.image} alt='x'/><br/><br/>
                </div>
                <DetailRepleBox post_id={id}/>
            </div>
        </section>
    );
};

export default PostDetailPage;
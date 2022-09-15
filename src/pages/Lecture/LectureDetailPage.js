import React,{useState,useEffect} from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import '../../style/pages/Lecture/LectureDetailPage.css';
import { useLocation } from 'react-router-dom';
import LectureLeft from '../../components/LecturePage/LectureLeft';
import LectureRight from '../../components/LecturePage/LectureRight';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { PROXY } from '../../data/serverUrl';
import Parser from 'html-react-parser';


const LectureDetailPage = () => {
    const PROXY = process.env.REACT_APP_PROXY;
    const location = useLocation();
    const lectureId = location.state.lecture[0].lectureId;
    const lectureTitle = location.state.lecture[0].lectureTitle;
    const lectureThumbNail = location.state.lecture[0].lectureThumbNail;
    const lectureImg2 = location.state.lecture[0].lectureImg2;
    const lectureImg3 = location.state.lecture[0].lectureImg3;
    const lectureImg4 = location.state.lecture[0].lectureImg4;
    const lectureImg5 = location.state.lecture[0].lectureImg5;
    const lecturePrice = location.state.lecture[0].lecturePrice;
    // const categoryData = location.state.lecture[0].categoryData;
    // const detailCategoryData = location.state.lecture[0].detailCategoryData;
    const lectureLikeCnt = location.state.lecture[0].lectureLikeCnt;
    const lectureWriter = location.state.lecture[0].lectureWriter;
    const lectureEnroll = location.state.lecture[0].lectureEnroll;
    const lectureYoutube = location.state.lecture[0].lectureYoutube;
    const lectureLikeMember = location.state.lecture[0].lectureLikeMember;
    const lectureDescription = location.state.lecture[0].lectureDescription;

    const [purchaseStatus,setPurchaseStatus] = useState(false);
    const [myLecutureStatus,setMyLectureStatus] = useState(false);
    const [classModify,setClassModify] = useState(false);
    const [likeState,setLikeState] = useState(false);
    const [likeCount,setLikeCount] = useState(lectureLikeCnt);
    const [applicationModal,setApplicationModal] = useState(false);
    const imgThumbNail = `<img src=${PROXY+lectureThumbNail} alt='강의내용이미지' />`
    useEffect(()=>{
        //나의 강의 인지에 대한 state 실행
        if(localStorage.getItem('react_nickname') === lectureWriter){
            setMyLectureStatus(true);
        }
    },[]);
    
    useEffect(()=>{
        //강의를 구매하였는지에 대한 state 실행 
        for(let student of lectureEnroll){
            if(student === localStorage.getItem('react_nickname')){
                setPurchaseStatus(true);
            }
        }
    },[]);

    useEffect(()=>{
        console.log(lectureLikeMember);
        for(let member of lectureLikeMember){
            if(member === localStorage.getItem('react_nickname')){
                setLikeState(true);
            }
        }
    },[]);

    const clickRegistration = ()=>{
        console.log('강의 신청 폼 or 페이지 or 모달 이동');
        handleShow();
    };
    const clickWatch = ()=>{
        console.log('강의시청 유튜브 링크이동');
        window.open(lectureYoutube,'_blank');
    };
    const clickLectureModify = ()=>{
        console.log('강의 수정 로직 실행');
        setClassModify(!classModify);
    };
    const purchaseLecture = ()=>{
        //강의 구매 로직
        setPurchaseStatus(!purchaseStatus);
        alert('클래스 수강 시작!');
        handleClose();
    };
    const clickUnFill = ()=>{
        if(!purchaseStatus){
            alert('먼저 강의를 구매하세요!');
        }else{
            fetch(`${PROXY}/lectures/${lectureId}/like/`,{
                method: 'PATCH',
                body:({
                    like_members:localStorage.getItem('react_nickname')
                }),
                    headers:{
                        'Authorization' : 'Bearer '+localStorage.getItem('react_accessToken')
                    }
            })
            // axios.patch(`${PROXY}/lectures/${lectureId}/like/`,{
            //     like_members:localStorage.getItem('react_nickname')
            // },{
            //     'Authorization': 'Bearer '+localStorage.getItem('react_accessToken')
            // })
            .then((res)=>{
                setLikeState(!likeState);
                setLikeCount(likeCount+1);
                
            }).catch((err)=>{
                console.log(err);
            })
        }
    };
    const clickFill = ()=>{
        if(!purchaseStatus){
            alert('먼저 강의를 구매하세요!');
        }else{
            setLikeCount(lectureLikeCnt - 1);
            setLikeState(!lectureLikeCnt);
        }
    };
    const handleClose = () => setApplicationModal(false);
    const handleShow = () => setApplicationModal(true);

    return (
        <div>
            {
            console.log('start')
        }
            <Header />
            <Navbar val={'lecture'}/>
            <div id="LectureDetailDiv">
                <section id="LectureLeftSection">
                    <LectureLeft lectureId={lectureId} lecturePrice={lecturePrice} lectureYoutube={lectureYoutube} lectureDescription={lectureDescription} lectureThumbNail={lectureThumbNail} lectureImg2={lectureImg2} lectureImg3={lectureImg3} lectureImg4={lectureImg4} lectureImg5={lectureImg5} classModify={classModify} lectureTitle={lectureTitle}  />
                </section>

                <section id="LectureRightSectionButton">
                {
                    (myLecutureStatus)?
                    <button type="button" onClick={clickLectureModify}>클래스 수정하기</button>:
                    (purchaseStatus)?
                    <button type="button" onClick={clickWatch}>클래스 시청하기</button>:
                    <button type="button" onClick={clickRegistration}>클래스 신청하기</button>
                }
                </section>
                <section id="LectureRightSection">

                    <LectureRight lectureId={lectureId} lectureTitle={lectureTitle} lecturePrice={lecturePrice} />
                    {/* 조건
                    1. 로그아웃 상태일때 , 하트는 빈하트, 좋아요 수는 표시해준다.
                    2. 로그인 상태일때,
                      1) 구매를 했다면, 하트를 누를 수 있도록 한다.
                      2) 구매를 하지 않았다면, 하트를 못누르도록 하고 빈하트로만 표시한다.
                      3) 나의 강의라면?
                        1- 구매를 하지 않은 상태처럼 표시한다. (자기거에 좋아요 누를 수 없음) */}
                    <article id="likeArticle">
                    {
                        (likeState)?
                        <img onClick={clickFill} src='/img/fillHeart.png' alt='하트' />:
                        <img onClick={clickUnFill} src='/img/unfillHeart.png' alt='빈하트' />
                    }
                    <span>{likeCount}</span>
                    </article>
                    {
                        (myLecutureStatus)?
                        <button type="button" onClick={clickLectureModify}>클래스 수정하기</button>:
                        (purchaseStatus)?
                        <button type="button" onClick={clickWatch}>클래스 시청하기</button>:
                        <button type="button" onClick={clickRegistration}>클래스 신청하기</button>
                    }
                    {
                        (!applicationModal) ||
                        <div id="modalDiv">
                            <Modal className="modal-container" show={applicationModal} onHide={handleClose}>
                            {Parser(imgThumbNail)}<br/>
                            <p> &nbsp; 제목 : {lectureTitle}</p>
                            <p> &nbsp; 가격 : {lecturePrice}</p>
                            <p> &nbsp; 강의를 신청하시겠습니까?</p>
                            <hr />
                            <p style={{fontWeight:"1000"}}> &nbsp; 차감 포인트 : {lecturePrice}</p>
                            <button id="modalBtn" type="button" onClick={purchaseLecture}>클래스 수강시작</button>
                            </Modal>
                        </div>
                    }
                    
                </section>
            </div>
        </div>
    );
};

export default LectureDetailPage;
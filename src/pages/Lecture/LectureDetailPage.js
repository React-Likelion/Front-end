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
    const imgThumbNail = `<img src=${PROXY+lectureThumbNail} alt='?????????????????????' />`
    useEffect(()=>{
        //?????? ?????? ????????? ?????? state ??????
        if(localStorage.getItem('react_nickname') === lectureWriter){
            setMyLectureStatus(true);
        }
    },[]);
    
    useEffect(()=>{
        //????????? ????????????????????? ?????? state ?????? 
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
        console.log('?????? ?????? ??? or ????????? or ?????? ??????');
        handleShow();
    };
    const clickWatch = ()=>{
        console.log('???????????? ????????? ????????????');
        window.open(lectureYoutube,'_blank');
    };
    const clickLectureModify = ()=>{
        console.log('?????? ?????? ?????? ??????');
        setClassModify(!classModify);
    };
    const purchaseLecture = ()=>{
        //?????? ?????? ??????
        setPurchaseStatus(!purchaseStatus);
        alert('????????? ?????? ??????!');
        handleClose();
    };
    const clickUnFill = ()=>{
        if(!purchaseStatus){
            alert('?????? ????????? ???????????????!');
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
            alert('?????? ????????? ???????????????!');
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
                    <button type="button" onClick={clickLectureModify}>????????? ????????????</button>:
                    (purchaseStatus)?
                    <button type="button" onClick={clickWatch}>????????? ????????????</button>:
                    <button type="button" onClick={clickRegistration}>????????? ????????????</button>
                }
                </section>
                <section id="LectureRightSection">

                    <LectureRight lectureId={lectureId} lectureTitle={lectureTitle} lecturePrice={lecturePrice} />
                    {/* ??????
                    1. ???????????? ???????????? , ????????? ?????????, ????????? ?????? ???????????????.
                    2. ????????? ????????????,
                      1) ????????? ?????????, ????????? ?????? ??? ????????? ??????.
                      2) ????????? ?????? ????????????, ????????? ??????????????? ?????? ??????????????? ????????????.
                      3) ?????? ?????????????
                        1- ????????? ?????? ?????? ???????????? ????????????. (???????????? ????????? ?????? ??? ??????) */}
                    <article id="likeArticle">
                    {
                        (likeState)?
                        <img onClick={clickFill} src='/img/fillHeart.png' alt='??????' />:
                        <img onClick={clickUnFill} src='/img/unfillHeart.png' alt='?????????' />
                    }
                    <span>{likeCount}</span>
                    </article>
                    {
                        (myLecutureStatus)?
                        <button type="button" onClick={clickLectureModify}>????????? ????????????</button>:
                        (purchaseStatus)?
                        <button type="button" onClick={clickWatch}>????????? ????????????</button>:
                        <button type="button" onClick={clickRegistration}>????????? ????????????</button>
                    }
                    {
                        (!applicationModal) ||
                        <div id="modalDiv">
                            <Modal className="modal-container" show={applicationModal} onHide={handleClose}>
                            {Parser(imgThumbNail)}<br/>
                            <p> &nbsp; ?????? : {lectureTitle}</p>
                            <p> &nbsp; ?????? : {lecturePrice}</p>
                            <p> &nbsp; ????????? ?????????????????????????</p>
                            <hr />
                            <p style={{fontWeight:"1000"}}> &nbsp; ?????? ????????? : {lecturePrice}</p>
                            <button id="modalBtn" type="button" onClick={purchaseLecture}>????????? ????????????</button>
                            </Modal>
                        </div>
                    }
                    
                </section>
            </div>
        </div>
    );
};

export default LectureDetailPage;
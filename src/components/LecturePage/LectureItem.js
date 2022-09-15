import React,{useState,useEffect} from 'react';
import '../../style/components/LecturePage/LectureItem.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PROXY } from '../../data/serverUrl';

const LectureItem = ({id,categoryData,detailCategoryData}) => {
    const navigate = useNavigate();
    const [propsObj,setPropsObj] = useState({

    });
    const propsArray = [];
    let realDescription;

    useEffect(()=>{
        axios.get(`${PROXY}/lectures/${id}/`)
        .then((res)=>{
            setPropsObj({
                lectureId:res.data.id,
                lectureTitle:res.data.title,
                lectureThumbNail:res.data.image1,
                lectureImg2:res.data.image2,
                lectureImg3:res.data.image3,
                lectureImg4:res.data.image4,
                lectureImg5:res.data.image5,
                lecturePrice:res.data.price,
                lectureLikeCnt:res.data.like_cnt,
                lectureWriter:res.data.writer,
                lectureEnroll:res.data.enroll_students,
                lectureYoutube:res.data.youtube_link,
                lectureLikeMember:res.data.like_members,
                lectureDescription:res.data.description,
                categoryData:categoryData,
                detailCategoryData:detailCategoryData,
            });
        }).catch((err)=>{
            console.log(err);
        })
    },[]);
    
    const clickLectureItem = ()=>{
        //강의 상세 페이지로 이동하도록
        propsArray.push(propsObj);
        navigate('/lecture/detail',{state:{lecture:propsArray}});
    };

    const priceMent = `월 ${propsObj.lecturePrice}원`;
    const imgSrc = `${PROXY}${propsObj.lectureThumbNail}`
    return (
        <div onClick={clickLectureItem} style={{cursor:'pointer'}} id="LectureItemDiv">
            <section id="LectureItemImg">
                <img src={imgSrc} alt="강의 이미지" />
            </section>
            <section id="LectureItemTitle">
                <p>{propsObj.lectureTitle}</p>
            </section>
            <section id="LectureItemInfo">
                <img src='/img/fillHeart.png' style={{width:"15px"}} alt='좋아요하트' />
                <span>&nbsp;{propsObj.lectureLikeCnt}</span><br/>
                <span>{priceMent}</span>
            </section>
        </div>
    );
};

export default LectureItem;
import React,{useEffect,useState} from 'react';
import LectureItem from './LectureItem';
import '../../style/components/LecturePage/LectureBox.css';
import axios from 'axios';
// import { PROXY } from '../../data/serverUrl';

const LectureBox = ({categoryData,detailCategoryData,option}) => {
    const PROXY = process.env.REACT_APP_PROXY;
    //axios로 필터링 된 강의에 대한 정보들을 받아옴
    //정보의 형태는 [object]
    //그걸 map형태로 뿌려줌
    const [allLectures,setAllLectures] = useState([]);
    const [filterData,setFilterData] = useState([]);
    const [optionBool,setOptionBool] = useState(true);
    const [categoryArray,setCategoryArray] = useState([]);
    const [filterBool,setFilterBool] = useState(false);
    
    useEffect(()=>{
        axios.get(`${PROXY}/lectures/`)
        .then((res)=>{
            setAllLectures(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])   
    useEffect(()=>{
        if(option==='인기순'){
            setFilterData([]);
            setFilterData(
                allLectures.sort((a,b)=>
                    b.like_cnt - a.like_cnt
                )   
            )
            setOptionBool(false);
        }else{
            setOptionBool(true);
        }
    },[option]);
    useEffect(()=>{
        setCategoryArray([]);
        setCategoryArray(
            allLectures.filter((ele)=>{
                return (ele.main_category === categoryData) && (ele.sub_category === detailCategoryData);
            })
        );
        if(detailCategoryData.length !== 0){
            setFilterBool(true);
        }
    },[categoryData,detailCategoryData]);

    return (
        <div id="LectureBoxDiv">
            {
                (optionBool===true && (categoryArray.length===0) && (filterBool===false))?
                allLectures.map((ele)=>{
                    return <LectureItem id={ele.id} key={ele.id} /*title={ele.title} img={ele.img} price={ele.price}*/ categoryData={categoryData} detailCategoryData={detailCategoryData} />;
                }):(optionBool===false && categoryArray.length===0 && (filterBool===false))?
                filterData.map((ele)=>{
                    return <LectureItem id={ele.id} key={ele.id} /*title={ele.title} img={ele.img} price={ele.price}*/ categoryData={categoryData} detailCategoryData={detailCategoryData} />;
                }):((categoryArray.length!==0) && (filterBool===true))?
                categoryArray.map((ele)=>{
                    return <LectureItem id={ele.id} key={ele.id} /*title={ele.title} img={ele.img} price={ele.price}*/ categoryData={categoryData} detailCategoryData={detailCategoryData} />;
                }):
                <div style={{display:"block"}}>
                    <img src='/img/questionMark.png' alt='물음표' />
                    <p>이런! 찾는 강의가 없습니다.</p>
                </div>
            }
        </div>
    );
};

export default LectureBox;
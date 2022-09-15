import React, {useEffect, useState} from 'react';
import Header from '../../components/Header.js';
import { useNavigate } from 'react-router-dom';
import '../../style/pages/Lecture/LectureUploadPage.css';
import { lectureCategoryData } from '../../data/CategoryData.js';
import ImagePreview from '../../components/ImagePreview.js';
import axios from 'axios';
// import {PROXY} from '../../data/serverUrl.js';

const LectureUploadPage = () => {
    const PROXY = process.env.REACT_APP_PROXY;
    const navigate = useNavigate();
    const [images, setImages] = useState();
    const [checkedInputs, setCheckedInputs] = useState([]);
    const [lectureInfo, setLectureInfo] = useState({
        youtube_link : '',
        title : '',
        price : 0,
        main_category : '',
        sub_category : '선택안함',
        description : '',
        writer: localStorage.getItem('react_nickname')
    });

    const changeHandler = (checked, id) => {
        if (checked) {
          setCheckedInputs([...checkedInputs, id]);
        } else {
          setCheckedInputs(checkedInputs.filter((el) => el !== id));
        }
      };

    const handleLectureInfo = (e) => {
        setLectureInfo({
            ...lectureInfo,
            [e.target.name]: e.currentTarget.value
        })
    }

    const makeSubcategoryBox = () => {
        if (!lectureInfo.main_category) return <option value='' disabled>선택</option>;
        const result = [<option value='' disabled>선택</option>];
        lectureCategoryData[lectureInfo.main_category].map((ele, idx) => 
            result.push(<option key={idx} value={ele}>{ele}</option>)
        )
        return result;
    }

    const clickUpload = () => {
        console.log(lectureInfo);

        // 필수값 처리
        if (Object.values(lectureInfo).includes('')) {
            alert("입력되지 않은 값이 있습니다.");
            return;
        } 

        // 재생목록 형태만 가능
        if(!lectureInfo.youtube_link.includes('list=')) {
            alert("유튜브 URL은 반드시 재생목록을 가져야 합니다.");
            return;
        }

        // 체크박스 검사
        if(checkedInputs.length !== 2) {
            alert("모든 체크박스에 동의해주세요.");
            return;
        }

        if(!images) {
            alert("이미지를 반드시 첨부해 주세요.(최대 5개까지 가능합니다)");
            return;
        }

        if(lectureInfo.sub_category === '선택안함'){
            alert("세부 카테고리를 설정해주세요.");
            return;
        }

        // 강의 등록 통신
        // 1. formData 생성 후 데이터 append
        let form_data = new FormData();
        for(let i = 0; i < images.length; i++) {
            form_data.append(`image${i+1}`, images[i]);
        }
        // 나머지 데이터들은 다 JSON으로 맞춰주기
        // form_data.append("data", JSON.stringify(lectureInfo));
        form_data.append('youtube_link', lectureInfo.youtube_link);
        form_data.append('title', lectureInfo.title);
        form_data.append('description', lectureInfo.description);
        form_data.append('main_category', lectureInfo.main_category);
        form_data.append('sub_category', lectureInfo.sub_category);
        form_data.append('price', lectureInfo.price);
        form_data.append('writer',lectureInfo.writer);
        for (let key of form_data.keys()) {
            console.log(key);
        }
        for (let value of form_data.values()) {
            console.log(value);
        }

        // 2. axios로 전송
        axios.post(`${PROXY}/lectures/`, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+localStorage.getItem('react_accessToken')
              }
          })
        .then((res) => {
            console.log(res);
            navigate('/lecture');
        })
        .catch((err) => {
            console.log(err);
        })

        // // formData 출력
        // for (let key of form_data.keys()) {
        //     console.log(key);
        // }
        // for (let value of form_data.values()) {
        //     console.log(value);
        // }

    }

    return (
        <section className='LectureUploadPage'>
            <Header/>
            <div className='upload-container'>
                <div>영상 업로드</div>
                <div>
                    <div>유튜브 URL</div>
                    <input type='text' onChange={handleLectureInfo} name='youtube_link'></input>
                    <div>강의명</div>
                    <input type='text' onChange={handleLectureInfo} name='title'></input>
                    <div>강의 가격</div>
                    <input type='text' onChange={handleLectureInfo} name='price'></input>
                    <div>카테고리</div>
                    <div id='lecture-select-box'>
                        <select value={lectureInfo.main_category} onChange={handleLectureInfo} name='main_category' defaultValue=''>
                            <option value='' disabled>선택</option>
                            {
                                Object.keys(lectureCategoryData).map((ele, idx) => {
                                    return <option key={idx} value={ele}>{ele}</option>
                                })
                            }
                        </select> 
                        <select value={lectureInfo.sub_category} onChange={handleLectureInfo} name='sub_category' defaultValue=''>
                            { makeSubcategoryBox() }
                        </select>
                    </div>
                </div>
                <textarea id='description-textarea' 
                    onChange={handleLectureInfo} name='description'
                    placeholder='수업이나 활동 내용 입력'></textarea><br/>
                    <ImagePreview text={'썸네일 첨부하기'} setImages={setImages} imgCnt={5}/>
                <div className='picture-preview-box'></div>
                <div className='checkbox-text'>
                    <input id='1' type='checkbox' onChange={(e) => {changeHandler(e.currentTarget.checked, '1')}} 
                    checked={checkedInputs.includes('1') ? true : false}/>
                    본인의 유튜브 ID를 입력하였음을 확인하였으며, 영상을 비공개로 지정하였음을 확인하였습니다.
                </div>
                <div className='checkbox-text'>
                    <input id='2' type='checkbox' onChange={(e) => {changeHandler(e.currentTarget.checked, '2')}}
                    checked={checkedInputs.includes('2') ? true : false}/>
                    어겼을 시 법적 책임을 물을 수 있음을 확인하였습니다.
                </div>
                <button onClick={clickUpload} className='upload-btn'>등록하기</button>
            </div>
        </section>
    );
};

export default LectureUploadPage;
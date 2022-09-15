import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import {PROXY} from '../../data/serverUrl.js';
import '../../style/components/LecturePage/LectureLeftEditor.css';
import { lectureCategoryData } from '../../data/CategoryData.js';
import { useNavigate } from 'react-router-dom';

// {setDesc, desc, setImage}
const LectureLeftEditor = ({lectureId,titleLecture,lectureYoutube,lecturePrice,imgThumbNail,lectureDescription,lectureThumbNail}) => { // (1)
    // const dummy = `<img src=${lectureThumbNail} alt="이미지" />
    // ${lectureDescription}`;
    const navigate = useNavigate();
    const PROXY = process.env.REACT_APP_PROXY;

    //description 뿌리는 방법
    // 1. 최초 강의 등록시 등록하는 이미지 및 내용 받아오기. (썸네일 및 기본내용)
    // 2. 받아서 단순하게 뿌려주기.
    // 3. 수정폼에도 같은 방식으로 뿌려주기.
    // 4. 수정폼에서 수정하고 올리는 방식
    // - html로 정리된 수정폼 내용과 이미지가 올라간 순서대로 formData 이미지 데이터
    // 5. 다시 디테일 페이지 및 수정폼에 받아올때는 description(html 문서)를 받아온다.
    // 6. 안에 있는 img태그에 src를 이미지 파일 순서대로 넣어준다. split 및 replace 이용
    // 7. 짜르고 붙인 description을 새로만든 변수 (content)에 넣어준다.
    // 8. 그걸 디테일 페이지 및 수정폼에 뿌린다.
    
    const [lectureData,setLectureData] = useState({
        'id':lectureId,
        'title':titleLecture,
        'description':'',
        'price':lecturePrice,
        'youtube_link':lectureYoutube,
        'field':'',
        'tag':'',
    });
    
    const [imgFile,setImgFile] = useState([]);
    
    const titleHandler = (e)=>{
        setLectureData({...lectureData,
            title:e.target.value});
    };
    const priceHandler = (e)=>{
        setLectureData({...lectureData,
            price:parseInt(e.target.value)});
    };
    const youtubeHandler = (e)=>{
        //재생목록이 맞는지 검사
        setLectureData({...lectureData,
            youtube_link:e.target.value});
    };
    const fieldHandler = (e)=>{
        setLectureData({...lectureData,
            field:e.target.value});
    };
    const tagHandler = (e)=>{
        setLectureData({...lectureData,
            tag:e.target.value});
    };
    const makeTagBox = () => {
        const result = lectureCategoryData[lectureData.field].map((ele, idx) => {
            return <option key={idx} value={ele}>{ele}</option>
        })
        return result;
    };
    const imgArray = [];

    const clickModifySubmit = (e)=>{
        
        console.log('수정 제출');
        console.log(imgArray);
        setImgFile(imgArray);
        console.log(imgFile);
        let data = new FormData();
        console.log(imgFile.length);

        for(let i=0; i<imgFile.length; i++){
            console.log('test');
            data.append(`image${i+1}`,imgFile[i]);
        }
        
        data.append('title',lectureData.title);
        data.append('description',lectureData.description);
        data.append('price',lectureData.price);
        data.append('youtube_link',lectureData.youtube_link);
        data.append('main_category',lectureData.field);
        data.append('sub_category',lectureData.tag);
        for (let key of data.keys()) {
            console.log(key);
        }
        for (let value of data.values()) {
            console.log(value);
        }
        
        data.append("data", JSON.stringify(lectureData));
        if (Object.values(lectureData).includes('')) {
            alert("입력되지 않은 값이 있습니다.");
            return;
        } 
        axios.patch(`${PROXY}/lectures/${lectureId}/`,data,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+localStorage.getItem('react_accessToken')
            }
        })
        .then((res)=>{
            console.log(res);
            navigate('/lecture');
        })
        .catch((err)=>console.log(err))
    };

    const customUploadAdapter = (loader) => { // (2)
        return {
            upload(){
                return new Promise ((resolve, reject) => {
                        loader.file.then( (file) => {
                            // setImgFile([
                            //     ...imgFile,
                            //     file
                            // ]);
                            imgArray.push(file);
                            setImgFile(imgArray);
                            console.log(file);
                            console.log(imgArray);
                            console.log(imgFile);
                        })
                })
            }
        }
    }

    function uploadPlugin (editor){ // (3)
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        }
    }
    return (
        <>
            <h2>강의 소개</h2>
            <label>제목 : <input className="title-input" onChange={(titleHandler)} type='text' placeholder='제목' value={lectureData.title} /></label>
            <label>가격 : <input className="title-input" onChange={(priceHandler)} type='text' placeholder='가격' value={lectureData.price} /></label>
            <label>링크 : <input className="title-input" onChange={(youtubeHandler)} type='text' placeholder='유튜브 링크' value={lectureData.youtube_link} /></label>
            <div>카테고리 : </div>
                    <div id='categoryBox'>
                        <select onChange={fieldHandler} name='field'>
                            {Object.keys(lectureCategoryData).map((ele, idx) => {
                                return <option key={idx} value={ele}>{ele}</option>
                            })}
                        </select>
                        {lectureData.field && lectureCategoryData[lectureData.field][0] !== '' ? 
                        <select onChange={tagHandler} name='tag'>
                            {makeTagBox()}
                        </select> : ''}
                    </div>

            <CKEditor
            editor={ClassicEditor}
            config={{ // (4)
                extraPlugins: [uploadPlugin]
            }}
            data="사진은 5장 까지 등록이 가능합니다."
            onReady={editor => {
                // console.log('Editor is ready to use!', editor);
                const data = editor.getData();
                setLectureData({...lectureData,
                    description:data});
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                // setDesc(data);
                // console.log(desc);
                console.log(data);
                setLectureData({...lectureData,
                    description:data});
            }}
            onBlur={(event, editor) => {
                // console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                // console.log('Focus.', editor);
            }}/>
            <button className="submit-button" onClick={clickModifySubmit}>입력</button>
        </>
    )
}

export default LectureLeftEditor
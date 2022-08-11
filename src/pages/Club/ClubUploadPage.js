import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header.js';
import '../../style/pages/Club/ClubUploadPage.css';
import ImagePreview from '../../components/ImagePreview.js';
import { locationData, fieldData, ageData } from '../../data/CategoryData.js';

const ClubUploadPage = () => {

    const navigate = useNavigate();
    const [images, setImages] = useState();
    const [clicked, setClicked] = useState([]);

    const [clubInfo, setClubInfo] = useState({
        location: '',
        title: '',
        field: '',
        age_group: '',
        limit: '', 
        description: '',
        leader_id: ''
    });

    const handleClubInfo = (e) => {
        if(e.target.name === 'age_group') {
            const modify = [false, false, false, false];
            modify[e.target.id] = true;
            setClicked(modify);
        } 
        setClubInfo({
            ...clubInfo,
            [e.target.name]: e.currentTarget.value
        })
    }
    
    const clickUpload = () => {
        console.log(clubInfo);
        if (Object.values(clubInfo).includes('')) {
            alert("입력되지 않은 값이 있습니다.");
            return;
        } else if (Number(clubInfo.limit) < 3 || isNaN(clubInfo.limit)) {
            alert("정원은 3명 이상의 숫자 형태이어야 합니다."); 
        }
        // 동호회 등록 통신
        
    }


    return (
        <section className='ClubUploadPage'>
            <Header/>
            <div className='upload-container'>
                <div>동호회 등록하기</div>
                <div>
                    <div>지역</div>
                    <select onChange={handleClubInfo} name='location'>
                        <option value='' defaultValue>선택</option>
                        {locationData.map((ele, idx) => <option key={idx} value={ele}>{ele}</option>)}
                    </select>
                    <div>모임 이름</div>
                    <input type='text' onChange={handleClubInfo} name='title'></input>
                    <div>분야</div>
                    <select onChange={handleClubInfo} name='field'>
                        <option value='' defaultValue>선택</option>
                        {fieldData.map((ele, idx) => <option key={idx} value={ele}>{ele}</option>)}
                    </select>
                    <div>연령</div>
                    <div id='age-btn-box'>
                        {ageData.map((ele, idx) => <button className={clicked[idx] ? 'clicked' : 'unclicked'} id={idx} onClick={handleClubInfo} value={ele} name='age_group'>{ele}</button>)}
                    </div>
                    <div>정원</div>
                    <input type='text' onChange={handleClubInfo} name='limit' placeholder='   3명 이상의 숫자로 입력해주세요.'></input>
                </div>
                <textarea onChange={handleClubInfo} name='description' id='description-textarea' placeholder='수업이나 활동 내용 입력'></textarea><br/>
                <ImagePreview text={'대표 사진 첨부하기'} setImages={setImages}/>
                <button className='upload-btn' onClick={clickUpload}>등록하기</button>
            </div>
        </section>
    );
};

export default ClubUploadPage;
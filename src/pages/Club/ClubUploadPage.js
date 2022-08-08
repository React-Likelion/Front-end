import React from 'react';
import Header from '../../components/Header.js';
import '../../style/pages/Club/ClubUploadPage.css';

const ClubUploadPage = () => {
    return (
        <section className='ClubUploadPage'>
            <Header/>
            <div className='upload-container'>
                <div>동호회 등록하기</div>
                <div>
                    <div>지역</div>
                    <input></input>
                    <div>모임 이름</div>
                    <input></input>
                    <div>분야</div>
                    <input></input>
                    <div>연령</div>
                    <input></input>
                    <div>정원</div>
                    <input></input>
                </div>
                <textarea id='description-textarea' placeholder='수업이나 활동 내용 입력'></textarea><br/>
                <button className='picture-upload-btn'>대표사진 등록하기</button>
                <div className='picture-preview-box'></div>
                <button className='upload-btn'>등록하기</button>
            </div>
        </section>
    );
};

export default ClubUploadPage;
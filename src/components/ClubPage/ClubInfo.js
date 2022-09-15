import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
// import {PROXY} from '../../data/serverUrl';
import "../../style/components/ClubPage/ClubInfo.css"
import axios from 'axios';


const ClubInfo = ({params, member, name, image}) => {
    const PROXY = process.env.REACT_APP_PROXY;
    const navigate = useNavigate();
    const goArticleUpload = () => {
        navigate('articleUpload')
    }

    const clubJoinExit = () => {
        if (member && member.includes(Number(localStorage.getItem("react_userId"))) == false) {
            if (window.confirm("동호회에 가입 하시겠습니까?")) {
                axios
                    .post(`${PROXY}/clubs/${params.clubId}/`, {
                        "id": localStorage.getItem("react_userId")
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('react_accessToken')
                        }
                    })
                    .then((res) => {
                        alert("동호회 가입 완료")
                        window.location.reload();
                    })
                    .catch((err) => {
                        alert("에러 발생")
                        console.log(err)
                    })
                }
        } else {
            if (window.confirm("동호회를 탈퇴 하시겠습니까?")) {
                axios
                    .post(`${PROXY}/clubs/${params.clubId}/`, {
                        "id": localStorage.getItem("react_userId"),
                        "out": localStorage.getItem("react_userId")
                    }, {
                        headers: {  
                            'Authorization': 'Bearer ' + localStorage.getItem('react_accessToken')
                        }
                    })
                    .then((res) => {
                        alert("동호회 탈퇴 완료")
                        window.location.reload();
                    })
                    .catch((err) => {
                        alert("에러 발생")
                        console.log(err)
                    })
                }
        }
    }

    return (
        <section className='ClubInfoContainer'>
            <div className='clubInfo'>
                <img className='clubImg' src={image}/>
                <p className='clubInfoName'>{name}</p>
            </div>
            <div>
            <span className='clubMembers'>멤버 {member && member.length} &nbsp;&nbsp;&nbsp;</span>
                {(localStorage.getItem('react_accessToken')) ? 
                <div onClick={clubJoinExit} className='clubJoin'>
                    {
                        member && member.includes(Number(localStorage.getItem("react_userId")))
                            ? "동호회 탈퇴하기"
                            : "동호회 가입하기"
                    }
                </div> 
                :
                 ""}
            </div>
            <div className='clubArticleUplodBtn' onClick={goArticleUpload}>글쓰기</div>
            {/* 글쓰기 버튼을 누르면 글 작성 페이지로 가게 해야 함.
            커뮤니티 글 작성하기 페이지가 만들어지면 event 걸어서 navigate */
            }
        </section>
    );
}

export default ClubInfo;
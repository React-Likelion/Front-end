import React, {useEffect, useState} from 'react';
import '../../style/components/CommunityPage/CommunityBoard.css';
import CommunityPostItem from './CommunityPostItem';
import Pagination from '../Pagenation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import {PROXY} from '../../data/serverUrl';

const CommunityBoard = () => {
    const PROXY = process.env.REACT_APP_PROXY;
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]); // axios로 받아와서 설정
    const [notices, setNotices] = useState([]); 
    const [limit, setLimit] = useState(5); // 한 페이지당 보여줄 게시물 수
    const [page, setPage] = useState(1); // 현재 페이지 설정
    const offset = (page - 1) * limit; // 인덱스
    const [searchVal, setSearchVal] = useState('');
    
    const uploadPostBtn = () => {
        navigate('/community/upload');
    }

    const handleSearchVal = (e) => {
        setSearchVal(e.target.value);
    }

    const clickSearchBtn = (e) => {
        // 검색 버튼 눌렀을 때
    }

    // 게시물 조회
    useEffect(() => {
        axios.get(`${PROXY}/community/`)
        .then((res) => {
            setPosts(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <section className='CommunityBoard'>
            <article id='community-header'>
                <div>
                    {/* <select>
                        <option>공지</option>
                        <option>정보</option>
                        <option>자유</option>
                    </select> */}
                </div>
                <div>제목</div>
                <div>작성자</div>
                <div>작성일</div>
            </article>
            <article id='community-body'>
                {
                    // 공지 데이터 매핑
                }
                {
                    posts.slice(offset, offset + limit).map((ele, idx) => 
                        <CommunityPostItem ele={ele} key={idx} num={idx+1+offset} />)
                }
            </article>
            <article id='community-pagenation'>
                <div></div>
                <Pagination total={posts.length}  limit={limit}
                    page={page} setPage={setPage} />
                {localStorage.getItem('react_accessToken') && <div className='postBtn' onClick={uploadPostBtn}><img src='img/Teacher.png' alt=''/>게시글 등록하기</div>}
            </article>
            <article id='community-searchbar'>
                <select>
                    <option>분류</option>
                    <option>게시물</option>
                    <option>게시물+제목</option>
                </select>
                <input type='text' value={searchVal} onChange={handleSearchVal} placeholder='검색어를 입력해주세요'/>
                <button onClick={clickSearchBtn}>검색</button>
            </article>
        </section>
    );
};

export default CommunityBoard;
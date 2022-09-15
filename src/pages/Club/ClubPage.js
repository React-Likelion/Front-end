import React, {useState, useEffect} from 'react';
import Filter from '../../components/Filter';
import ClubBox from "../../components/ClubPage/ClubBox"
import "../../style/pages/Club/ClubPage.css"
import Header from './../../components/Header';
import Navbar from './../../components/Navbar';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import SearchBar from './../../components/SearchBar';
// import {PROXY} from '../../data/serverUrl';

const ClubPage = () => {
    const navigate = useNavigate();
    const [datas, setDatas] = useState([]);
    const [sort, setSort] = useState("");
    const PROXY = process.env.REACT_APP_PROXY;

    const onClickBtnHandler = (e) => {
        navigate('upload');
    }

    const onSort = (e) => {
        if(e.target.value == "최신순") {
            setSort(e.target.value)
            axios.get(`${PROXY}/clubs/by-newset/`)
            .then((res) => {
                console.log(res)
                setDatas(res.data);
            })
            .catch((err) => {
                console.log(err)
                alert("최신순 에러")
            })
        }
        else {
            setSort(e.target.value)
            axios.get(`${PROXY}/clubs/by-member/`)
            .then((res) => {
                setDatas(res.data);
            })
            .catch((err) => {
                alert("인기순 에러")
            })
        }
    }

    useEffect(() => {
        axios.get(`${PROXY}/clubs/by-newset/`)
        .then((res) => {
            console.log(res.data)
            setDatas(res.data);
        })
        .catch((err) => {
            alert("error 발생");
            console.log("클럽 페이지")
        })
    }, [])

    return (
        <section>
            <Header/>
            <Navbar val={'club'}/>
            <div className='SearchPostBox'>
                <div className='searchBar'><SearchBar /></div>
                {localStorage.getItem('react_accessToken') &&
                <div className='postBtn' onClick={onClickBtnHandler}><img src='img/Teacher.png' alt=''/>동호회 등록하기</div>}
            </div>
            <Filter field="clubs"/>
            <div className='clubPageContent'>
                <div className='sortBtnBox'>
                    <select value={sort} onChange={onSort} className='sortBtn'>
                        <option disabled={true} value="">정렬</option>
                        <option value="최신순">최신순</option>
                        <option value="인기순">인기순</option>  
                    </select>
                </div>
                <ClubBox datas={datas}/>
            </div>
        </section>
    );
};

export default ClubPage;
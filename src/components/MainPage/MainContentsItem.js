import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../style/components/MainPage/MainContentsItem.css';
// import {PROXY} from '../../data/serverUrl.js';

const MainContentsItem = ({category}) => {
    const PROXY = process.env.REACT_APP_PROXY;
    const [info, setInfo] = useState([]);

    // 박스 하나 요소 정의
    const makeItem = (ele) => {
        const infoItem = [];
        switch (category) {
            case 'lecture': 
                infoItem.push(
                <div id='lecture-item'>
                    <img src={ele.image1}/>
                    <div>{ele.title}</div>
                </div>
                )
                break;
            case 'mentoring': 
                infoItem.push(
                <div id='mentoring-item'>
                    <img src={ele.image}/>
                    <div>{ele.title}</div>
                    {ele.tag && ele.tag.map((ele) => <span>{ele}</span>)}
                </div>
                )
                break;
            case 'club': 
                infoItem.push(
                <div id='club-item'>
                    <img>{ele.image}</img>
                    <div>{ele.name}</div>
                    <div>{ele.location}  {ele.member}명</div>
                </div>
                )
                break;
            case 'community': 
                infoItem.push(
                <div id='community-item'>
                    <div>{ele.title}  {ele.date}</div>
                </div>
                )
                break;
        }
        return infoItem
    }

    useEffect(() => {
        if(category === 'club' || category === 'community') return;
        axios.get(`${PROXY}/${category}s/main/`)
        .then((res) => {
            setInfo(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [category])

    return (
        <div id={`${category}_container`}>
            {
                info && info.map((ele, idx) => {
                    return makeItem(ele)
                })
            }
        </div>
    );
};

export default MainContentsItem;
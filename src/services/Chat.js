import { database } from './firebase';
import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../style/services/Chat.css'
import axios from "axios";
// import {PROXY} from '../data/serverUrl'
import {onSnapshot} from 'firebase/firestore'

function Chat() {
    const PROXY = process.env.REACT_APP_PROXY;
    const {id}=useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [nickname, setNickname] = useState(); //유저 닉네임 저장
    const [msg, setMsg] = useState(""); //메세지
    const [chats, setChats]=useState([]); //채팅 목록

    const {title} = location.state;
    //채팅 가장 아래로 스크롤
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [chats]);
    //채팅 가장 아래로 스크롤
    const handleOnChange = (e) => {
        setMsg(e.target.value);
    };

    const usersCollectionRef = collection(database, "chat-rooms", id, 'messages');
    //create messages
    const handleSumbit = async (e) => {
        e.preventDefault();
        const newChat = {
            nickname: nickname,
            text: msg,
            timestamp: serverTimestamp(),
        };
        try {
            const res = await addDoc(usersCollectionRef, newChat);
            setChats([...chats, newChat]);
            setMsg('');
            console.log(res); // res는 undefined입니다.
        } catch (e) {
            console.log(e);
        }
    }

    const onClickDel = () => {
        axios.get(`${PROXY}/mentorings/${id}/mentoring-chats/withdraw/`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+localStorage.getItem('react_accessToken')
            }
        })
        alert('탈퇴되었습니다');
        navigate('/mentoring');
    }

    // read messages
    useEffect(()=>{
        setNickname(localStorage.getItem('react_nickname')); //유저 닉네임 저장
        const getData = async () => {
            const q = await query(usersCollectionRef, orderBy("timestamp","asc"));
            onSnapshot(q, (snapshot) => {
                let chatList=[];
                snapshot.forEach((doc) => {
                    chatList.push({...doc.data()})
                })
                setChats(chatList);
                // console.log(chatList)
            })
        };
        getData();
    },[]);
    return (
        <div>
            <Header/>
            <div className='chat-container'>
                <div className='topBox'>
                    <div className='titleP'>{title}</div>
                    <button className='delbtn'onClick={onClickDel}>탈퇴</button>
                </div>
                <div className='info-box'>                    
                    <div className='chat-box'>
                        {
                            chats.map((ele,i) => {
                                if(ele.nickname === nickname){ //내가 보낸 채팅
                                    return (
                                        <>
                                            <div className="chat-smallbox-my" key={i}>{ele.text}</div>
                                        </>
                                    )
                                } else{ //상대방이 보낸 채팅
                                    return (
                                        <>
                                            <div className='nicknameBox-your'>{ele.nickname}</div>
                                            <div className='chat-smallbox-your' key={i}>{ele.text}</div>
                                        </>
                                    )
                                }
                            })
                        }
                        {/* 채팅이 가장 아래로 스크롤 되느 부분 설정 */}
                        <div ref={messagesEndRef} /> 
                    </div>
                    
                    <div className='inputbox'>
                        <form onSubmit={handleSumbit}>
                            <input
                                placeholder="내용을 입력하세요."
                                value={msg}
                                onChange={handleOnChange}
                            />
                            <button type="submit">전송</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
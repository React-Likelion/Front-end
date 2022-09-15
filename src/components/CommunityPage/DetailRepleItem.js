import React, {useEffect, useState} from 'react';
import '../../style/components/CommunityPage/DetailRepleItem.css';
import axios from 'axios';
// import { PROXY } from '../../data/serverUrl';
import { useNavigate } from 'react-router-dom';


const DetailRepleItem = ({ele, idx, post_id, setComments}) => {
    // console.log(ele);
    const PROXY = process.env.REACT_APP_PROXY;
    const navigate = useNavigate();
    // const [replyFlag, setReplyFlag] = useState(false);
    // const [reples, setReples] = useState([]);
    const [modifyFlag, setModifyFlag] = useState(false);
    const [modifyContent, setModifyContent] = useState(ele.content);
    
    const [replyInfo, setReplyInfo] = useState({
        content: '',
        writer_id: localStorage.getItem('react_nickname'),
        board_id: Number(post_id), 
        comment_id: ele.id
    })

    const handleChangeReplyData = (e) => {
        setReplyInfo({
            ...replyInfo,
            content: e.target.value
        })
    }

    const handleModifyContent = (e) => {
        setModifyContent(e.target.value);
    }
    
    // 댓글 수정 on/off
    const handleCommentModifyFlagBtn = () => {
        setModifyFlag(!modifyFlag);
    }

    // 댓글 수정 -> 아직 안됨
    const handleCommentModifyBtn = () => {
        if(window.confirm('해당 댓글을 수정하시겠습니까 ?')) {
            axios.post(`${PROXY}/community/${post_id}/comments/${ele.id}/`, {
                content: modifyContent,
                writer_id: localStorage.getItem('react_nickname'),
                board_id: Number(post_id),
                comment_id: ele.id
            }, {
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('react_accessToken')
                  }
              })
            .then((res) => {
                console.log(res);
                setModifyFlag(!modifyFlag);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    // 댓글 삭제
    const handleCommentDeleteBtn = () => {
        if(window.confirm('해당 댓글을 삭제하시겠습니까 ?')) {
            axios.delete(`${PROXY}/community/${post_id}/comments/${ele.id}/`, {
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('react_accessToken')
                  }
              })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    // 대댓글 on/off
    // const handleReplyFlagBtn = () => {
    //     setReplyFlag(!replyFlag);
    // }

    // // 대댓글 등록
    // const handlePostCommentBtn = () => {
    //     console.log(replyInfo);
    //     if(window.confirm('대댓글을 등록하시겠습니까 ?')) {
    //         axios.post(`${PROXY}/community/${post_id}/comments/${ele.id}/`, replyInfo, {
    //             headers: {
    //                 'Authorization': 'Bearer ' + localStorage.getItem('react_accessToken')
    //             }
    //         })
    //         .then((res) => {
    //             alert('대댓글이 등록되었습니다.');
    //             setReples([...reples, replyInfo]);
    //             setReplyInfo({
    //                 ...replyInfo, content: ''
    //             })
    //         })
    //         .catch((err) => {
    //             alert('댓글을 등록하지 못했습니다.');
    //         })
    //     }
    // }

    // // 대댓글 조회
    // useEffect(() => {
    //     axios.get(`${PROXY}/community/${post_id}/comments/`)
    //     .then((res) => {
    //         setReples(res.data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }, []);


    return (
        <section id='DetailRepleItem'>
            <div><img src='' alt='이미지 없음'/></div>
            {
                !modifyFlag ?
                <div>
                    <div>{ele.writer_id}</div>
                    <div>{ele.content}</div>
                    <div>{ele.create_time && ele.create_time.substr(0,10)}</div>
                </div> : 
                <div id='modify-box'>
                    <div>{ele.writer_id}</div>
                    <input type='text' value={modifyContent} onChange={handleModifyContent}/>
                    <button onClick={handleCommentModifyBtn}>수정</button>
                    <div>{ele.create_time && ele.create_time.substr(0,10)}</div>
                </div>
            }
            <div id='extra-btns'>
                {/* <button onClick={handleReplyFlagBtn}>대댓글</button> */}
                {
                    ele.writer_id === localStorage.getItem('react_nickname') && 
                    <>
                        <button onClick={handleCommentModifyFlagBtn}>수정</button>
                        <button onClick={handleCommentDeleteBtn}>삭제</button>
                    </>
                }
            </div>
            {/* {
                replyFlag &&
                <><br/><div id='reply-box'>
                    <input type='text' placeholder='  대댓글을 입력해 주세요' value={replyInfo.content} onChange={handleChangeReplyData}/>
                    <button onClick={handlePostCommentBtn}>입력</button>
                </div></>
            } */}
        </section>
    );
};

export default DetailRepleItem;
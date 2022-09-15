import React,{useState} from 'react';
import '../style/pages/LoginPage.css';
import { useNavigate } from 'react-router-dom';
// import { PROXY } from '../data/serverUrl';
import axios from 'axios';
import { 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from './../services/firebase';

const LoginPage = () => {
    const PROXY = process.env.REACT_APP_PROXY;
    const navigate = useNavigate();
    const [loginData,setLoginData] = useState({
        identification:'',
        password:''
    });

    const handleChangeData = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };
    const handleClickLogin = (e)=>{
        // 입력 안된 값 처리
        if(Object.values(loginData).includes('')) {
            alert("아이디 또는 비밀번호가 입력되지 않았습니다.");
            return;
        }
        // 로그인 통신
        axios.post(`${PROXY}/accounts/login/`, loginData)
        .then((res) => {
            console.log(res.data);
            localStorage.setItem('react_accessToken',res.data.token.access_token);
            localStorage.setItem('react_refreshToken',res.data.token.refresh_token);
            localStorage.setItem('react_userId', res.data.token.user);
            localStorage.setItem('react_email',res.data.token.email);
            localStorage.setItem('react_nickname',res.data.token.nickname);
            if(localStorage.getItem('react_accessToken')) {navigate('/');}
        })
        .catch((err) => {
            if(err.response.data.non_field_errors) {
                alert(err.response.data.non_field_errors);
            } else {
                alert("로그인에 실패하였습니다.");
            }
        })
    };

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword]=useState("");
    const [user,setUser]=useState({});

    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    })

    //로그인
    const login = async () => {
        setLoginEmail(loginData.identification);
        setLoginPassword(loginData.password);
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    //로그아웃
    const logout = async () => {
        await signOut(auth);
    };

    return (
        <section id="login-container">
            <section id="login-left">
                <img onClick={() => navigate('/')} src={`${process.env.PUBLIC_URL}/img/react_logo.png`} />
            </section>
            <section id="login-right">
                <div id="login-form">
                    <h1>로그인</h1>
                    <input type="text" onChange={handleChangeData} name='identification' placeholder='   아이디를 입력하세요' /><br />
                    <input type="password" onChange={handleChangeData} name='password' placeholder='   비밀번호를 입력하세요' /><br /><br />
                    <button onClick={() => {
                        handleClickLogin()
                        login()
                        }} id="login-btn">로그인하기</button>
                    <div id='go-sign-text'><br/>아직 회원이 아니신가요 ? <span onClick={() => navigate('/signup')}>회원가입 하러가기</span></div>
                </div>
            </section>
        </section>
    );
};

export default LoginPage;
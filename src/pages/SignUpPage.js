import React,{useState} from 'react';
import '../style/pages/SignUpPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PROXY } from '../data/serverUrl';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../services/firebase';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [signUpData,setSignUpData] = useState({
        identification:'',
        password:'',
        password2:'',
        name:'',
        email:'',
        birth:'',
        job:'',
    });

    const handleChangeData = (e) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value,
        });
    };

    const clickSignUp = (e)=>{
        // e.preventDefault();
        //회원가입 통신
        axios.post(`${PROXY}/accounts/signup/`, signUpData)
        .then((res) => {
            // console.log(res);
            alert("입력한 이메일을 확인해주세요 !");
        })
        .catch((err) => {
            // console.log(err);
            alert("회원가입에 실패하였습니다.");
        })
    };
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    
    // `회원가입` 버튼의 onClick에 할당
    const register = async () => {
        //데이터의 이메일, 비밀번호 저장
        setRegisterEmail(signUpData.email);
        setRegisterPassword(signUpData.password);
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);
            
        } catch(err){
            console.log(err.messages);
        }
    }

    return (
        <div id="signupDiv">
            <section id="signupLeft">
                <img onClick={() => navigate('/')} src={`${process.env.PUBLIC_URL}/img/react_logo.png`} />
            </section>
            <section id="signupRight">
                
                <form id="signupForm">
                    <h2>회원가입</h2>
                    <input type="text" onChange={handleChangeData} name='identification' placeholder='아이디를 입력하세요' /><br />
                    <input type="password" onChange={handleChangeData} name='password' placeholder='비밀번호를 입력하세요' /><br />
                    <input type="password" onChange={handleChangeData} name='password2' placeholder='비밀번호를 한번 더 입력하세요' /><br />
                    <input type="text" onChange={handleChangeData} name='name' placeholder='이름을 입력하세요' /><br />
                    <input type="text" onChange={handleChangeData} name='nickname' placeholder='닉네임을 입력하세요' /><br />
                    <input type="text" name='email' onChange={handleChangeData} placeholder='이메일' />
                    <input type="text" onChange={handleChangeData} name='birth' placeholder='생년월일을 입력하세요 (ex)0000-00-00)' /><br />
                    <input type="text" onChange={handleChangeData} name='job' placeholder='직업을 입력하세요' /><br />
                    <button type="button" onClick={()=>{
                        clickSignUp()
                        register()
                    }} id="signupSubmit">가입하기</button><br/>
                    <article>이미 회원이신가요 ? <Link to='/login' id="goToLogin">로그인 하러 가기</Link></article>
                </form>
            </section>
        </div>
    );
};

export default SignUpPage;
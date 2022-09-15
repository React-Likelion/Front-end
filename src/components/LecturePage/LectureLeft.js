import React,{useState,useEffect} from 'react';
import '../../style/components/LecturePage/LectureLeft.css';
import LectureLeftEditor from './LectureLeftEditor';
import { PROXY } from '../../data/serverUrl';
import Parser from 'html-react-parser';

const LectureLeft = ({lectureId,lectureThumbNail,lectureImg2,lectureImg3,lectureImg4,lectureImg5,classModify,lectureYoutube,lectureTitle,lecturePrice,lectureDescription}) => {
    console.log(classModify);
    console.log(lectureId);
    let [realDescription,setRealDescription] = useState('');
    let real = lectureDescription;
    const [first,setFirst] = useState(true);
    // console.log(realDescription);
    // console.log(imgThumbNail.props);

    useEffect(()=>{
            const imgThumbNail = `<img src=${PROXY+lectureThumbNail} alt='강의내용이미지' />`;
            const imgSrc2 = `<img src=${PROXY+lectureImg2} alt='강의내용이미지' />`;
            const imgSrc3 = `<img src=${PROXY+lectureImg3} alt='강의내용이미지' />`;
            const imgSrc4 = `<img src=${PROXY+lectureImg4} alt='강의내용이미지' />`;
            const imgSrc5 = `<img src=${PROXY+lectureImg5} alt='강의내용이미지' />`;
            if(lectureDescription.includes('<figure class="image"><img></figure>')){
                setFirst(false);
            }
            if(lectureThumbNail !== null){
                real = real.replace('<figure class="image"><img></figure>',imgThumbNail);
            }if(lectureImg2 !== null){
                real = real.replace('<figure class="image"><img></figure>',imgSrc2);
            }if(lectureImg3 !== null){
                real = real.replace('<figure class="image"><img></figure>',imgSrc3);
            }if(lectureImg4 !== null){
                real = real.replace('<figure class="image"><img></figure>',imgSrc4);
            }if(lectureImg5 !== null){
                real = real.replace('<figure class="image"><img></figure>',imgSrc5);
            }

            console.log(real);
            setRealDescription(real);
    },[]);


    console.log(lectureThumbNail);

    return (
        <div id="LectureLeftDiv">
            {
                (classModify)?
                <LectureLeftEditor lectureYoutube={lectureYoutube} lectureId={lectureId} titleLecture={lectureTitle} lecturePrice={lecturePrice} lectureDescription={lectureDescription}/>:
                <>
                    {
                        (first === true)?
                        <>
                            <img src={PROXY+lectureThumbNail} alt='강의내용이미지' />
                            {lectureDescription}
                        </>:
                        Parser(realDescription)
                    }
                    
                </>
            }
            
        </div>
    );
};

export default LectureLeft;
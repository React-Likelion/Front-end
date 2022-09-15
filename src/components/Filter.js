import React, {useState, useEffect} from "react";
import "../style/components/Filter.css";
// import {PROXY} from "../data/serverUrl";
import axios from "axios";

const locationList = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도"
]
const FieldList = [
    "외국어",
    "미술",
    "요리",
    "음악",
    "요가/필라테스",
    "헬스",
    "법률",
    "상담",
    "뷰티",
    "프로그래밍",
    "비지니스/마케팅",
    "사진/영상",
    "부동산",
    "주식",
    "제테크",
    "창업/부업"
]
const ageList = ["40대", "50대", "60대", "70대 이상"]
const personnelList = ["5명+", "10명+", "20명+", "30명+"]

const Filter = ({field}) => {
    const [url, setUrl] = useState("");
    const PROXY = process.env.REACT_APP_PROXY;

    const [choicedLocationList, setChoiceLocationList] = useState([]);
    const [choicedFieldList, setChoicedFieldList] = useState([]);
    const [choicedAgeList, setChoicedAgeList] = useState([]);
    const [choicedPersonnelList, setChoicedPersonnelList] = useState([]);

    const choicedLocation = (e) => {
        // 선택한 옵션에 내가 누른 옵션이 포함되어 있지 않을 때
        if (!choicedLocationList.includes(e.target.id)) {
            setChoiceLocationList([
                ...choicedLocationList,
                e.target.id
            ])
            setUrl(
                url + `location=${encodeURIComponent(e.target.id)}&`// 선택한 옵션에 내가 누른 옵션이 포함되어 있을 때
            )
        } else {
            const newChoiceLocationList = choicedLocationList.filter(
                (item) => item !== e.target.id
            )
            setChoiceLocationList(newChoiceLocationList);
            setUrl(url.replace(`location=${encodeURIComponent(e.target.id)}&`, ""))
        }
        // if(!itemList.includes(e.target.id)) {     setChoiceItem(e.target.id);
        // setItemList([...itemList, e.target.id]); } else {     const newItemList =
        // itemList.fillter((it) => it !== e.target.id)     setItemList(newItemList) }
    }
    const choicedField = (e) => {
        // 선택한 옵션에 내가 누른 옵션이 포함되어 있지 않을 때
        if (!choicedFieldList.includes(e.target.id)) {
            setChoicedFieldList([
                ...choicedFieldList,
                e.target.id
            ])
            setUrl(
                url + `field=${encodeURIComponent(e.target.id)}&`// 선택한 옵션에 내가 누른 옵션이 포함되어 있을 때
            )
        } else {
            const newChoicedFieldList = choicedFieldList.filter(
                (item) => item !== e.target.id
            )
            setChoicedFieldList(newChoicedFieldList);
            setUrl(url.replace(`field=${encodeURIComponent(e.target.id)}&`, ""))
        }
        // if(!itemList.includes(e.target.id)) {     setChoiceItem(e.target.id);
        // setItemList([...itemList, e.target.id]); } else {     const newItemList =
        // itemList.fillter((it) => it !== e.target.id)     setItemList(newItemList) }
    }
    const choicedAge = (e) => {
        // 선택한 옵션에 내가 누른 옵션이 포함되어 있지 않을 때
        if (!choicedAgeList.includes(e.target.id)) {
            setChoicedAgeList([
                ...choicedAgeList,
                e.target.id
            ])
            setUrl(
                url + `age=${encodeURIComponent(e.target.id)}&`// 선택한 옵션에 내가 누른 옵션이 포함되어 있을 때
            )
        } else {
            const newChoicedAgeList = choicedAgeList.filter((item) => item !== e.target.id)
            setChoicedAgeList(newChoicedAgeList);
            setUrl(url.replace(`age=${encodeURIComponent(e.target.id)}&`, ""))
        }
        // if(!itemList.includes(e.target.id)) {     setChoiceItem(e.target.id);
        // setItemList([...itemList, e.target.id]); } else {     const newItemList =
        // itemList.fillter((it) => it !== e.target.id)     setItemList(newItemList) }
    }
    const choicedPersonnel = (e) => {
        // 선택한 옵션에 내가 누른 옵션이 포함되어 있지 않을 때
        if (!choicedPersonnelList.includes(e.target.id)) {
            setChoicedPersonnelList([
                ...choicedPersonnelList,
                e.target.id
            ])
            setUrl(
                url + `limit=${encodeURIComponent(e.target.id)}&`// 선택한 옵션에 내가 누른 옵션이 포함되어 있을 때
            )
        } else {
            const newChoicedPersonnelList = choicedPersonnelList.filter(
                (item) => item !== e.target.id
            )
            setChoicedPersonnelList(newChoicedPersonnelList);
            setUrl(url.replace(`limit=${encodeURIComponent(e.target.id)}&`, ""))
        }
        // if(!itemList.includes(e.target.id)) {     setChoiceItem(e.target.id);
        // setItemList([...itemList, e.target.id]); } else {     const newItemList =
        // itemList.fillter((it) => it !== e.target.id)     setItemList(newItemList) }
    }

    useEffect(() => {
        let axiosUrl = url.slice(0, url.length - 1);
        // axios 통신
        axios
            .get(`${PROXY}` + axiosUrl, {
                headrs: {
                    'Authorization': 'Bearer ' + localStorage.getItem('react_accessToken')
                }
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log("clubs filter 오류")
            })
            
        console.log(`${PROXY}` + axiosUrl)
    }, [url])

    useEffect(() => {
        if (field = "clubs") {
            setUrl("/clubs/?")
        } else {
            setUrl("/mentorings/?")
        }
    }, [])

    return (
        <section>
            <div className="FilterContainer">
                <div className="FilterBox">
                    <p className="FilterTitle">지역</p>
                    <div className="FilterItems">
                        {
                            locationList.map(
                                (item) => <span
                                    onClick={choicedLocation}
                                    id={item}
                                    className={"FilterItem" + (
                                        choicedLocationList.includes(item)
                                            ? "-choice"
                                            : ""
                                    )}>{item}</span>
                            )
                        }
                    </div>
                </div>
                <div className="FilterBox">
                    <p className="FilterTitle">분야</p>
                    <div className="FilterItems">
                        {
                            FieldList.map(
                                (item) => <span
                                    onClick={choicedField}
                                    id={item}
                                    className={"FilterItem" + (
                                        choicedFieldList.includes(item)
                                            ? "-choice"
                                            : ""
                                    )}>{item}</span>
                            )
                        }
                    </div>
                </div>
                <div className="FilterBox">
                    <p className="FilterTitle">연령</p>
                    <div className="FilterItems">
                        {
                            ageList.map(
                                (item) => <span
                                    onClick={choicedAge}
                                    id={item}
                                    className={"FilterItem" + (
                                        choicedAgeList.includes(item)
                                            ? "-choice"
                                            : ""
                                    )}>{item}</span>
                            )
                        }
                    </div>
                </div>
                <div className="FilterBox">
                    <p className="FilterTitle">인원수</p>
                    <div className="FilterItems">
                        {
                            personnelList.map(
                                (item) => <span
                                    onClick={choicedPersonnel}
                                    id={item}
                                    className={"FilterItem" + (
                                        choicedPersonnelList.includes(item)
                                            ? "-choice"
                                            : ""
                                    )}>{item}</span>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Filter;
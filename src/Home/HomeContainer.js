import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import HomePresenter from "./HomePresenter";
import { getDiaryList } from "../store/store";

const HomeContainer = () => {
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
    
    const list = useSelector((state) => state.diaryList);
    const dispatch = useDispatch(); // reducer 함수를 호출

    // title 제목
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장`;
    });

    useEffect(() => {
        axios
            .get("http://localhost/diary/diary_list", {
                params: {
                    curDate: curDate
                }
            })
            .then((result) => {
                console.log(result.data);
                dispatch(getDiaryList(result.data));
            });        
        }, [curDate, dispatch]);
        
    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
    };

    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
    };

    return (
        <HomePresenter
            data={list}
            headText={headText}
            curDate={curDate}
            increaseMonth={increaseMonth}
            decreaseMonth={decreaseMonth}
        />
    );
};

export default HomeContainer;

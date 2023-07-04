import { useState, useEffect } from "react";
import axios from "axios";

import HomePresenter from "./HomePresenter";
import { atom, useRecoilState } from 'recoil';

export const diaryList = atom({
    key: "diaryList",
    default: []
})

const HomeContainer = () => {
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    const [list, setList] = useRecoilState(diaryList);

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
                setList(result.data);
            });        
        }, [curDate]);
        
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

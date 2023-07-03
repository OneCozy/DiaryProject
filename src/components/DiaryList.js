import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MyButton from "./MyButton";
import { setSortType, setFilter, setSortedList } from "../store/store";
import axios from "axios";
import DiaryItem from './DiaryItem';

const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" }
];

const filterOptionList = [
    { value: "all", name: "전체" },
    { value: "good", name: "좋은 감정" },
    { value: "bad", name: "안좋은 감정" }
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
    return (
        <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
            {optionList.map((it, idx) => (
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            ))}
        </select>
    );
});

const DiaryList = ({ diaryList, curDate }) => {
    const select = useSelector((state) => state);
    const sortedList = useSelector((state) => state.sortedList)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost/diary/diary_sort", {
                params: {
                    sortOption: select.sortType,
                    filterOption: select.filter,
                    curDate: curDate
                }
            })
            .then((result) => {
                console.log(result.data);
                dispatch(setSortedList(result.data));
            });
    }, [select.filter, select.sortType, curDate, dispatch]);

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu value={select.sortType} onChange={(value) => dispatch(setSortType(value))} optionList={sortOptionList} />
                    <ControlMenu value={select.filter} onChange={(value) => dispatch(setFilter(value))} optionList={filterOptionList} />
                </div>

                <div className="right_col">
                    <MyButton type={"positive"} text={"새 일기쓰기"} onClick={() => navigate("/new")} />
                </div>
            </div>
            
            {sortedList.map((it) => (
                <DiaryItem key={it.id} {...it} />
            ))}
        </div>
    );
};

export default DiaryList;

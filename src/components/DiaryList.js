import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import axios from "axios";
import DiaryItem from './DiaryItem';
import { atom, useRecoilState } from 'recoil';

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
    useEffect(() => {
        console.log("Control Menu");
    })
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

export const sortType = atom({
    key: "sortType",
    default: "latest"
});

export const filter = atom({
    key: "filter",
    default: "all"
});

export const sortList = atom({
    key: "sortedList",
    default: []
});

const DiaryList = ({ curDate }) => {
    const [sortedType, setSortedType] = useRecoilState(sortType);
    const [filtered, setFiltered] = useRecoilState(filter);
    const [sortedList, setSortedList] = useRecoilState(sortList);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost/diary/diary_sort", {
                params: {
                    sortOption: sortedType,
                    filterOption: filtered,
                    curDate: curDate
                }
            })
            .then((result) => {
                setSortedList(result.data);
            });
    }, [filtered, sortedType, curDate]);

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu value={sortedType} onChange={(value) => setSortedType(value)} optionList={sortOptionList} />
                    <ControlMenu value={filtered} onChange={(value) => setFiltered(value)} optionList={filterOptionList} />
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

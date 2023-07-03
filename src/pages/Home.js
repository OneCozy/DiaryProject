import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import DiaryList from '../components/DiaryList';
import { getDiaryList } from "../store/store";

const Home = () => {

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    const dispatch = useDispatch();  // reducer 함수를 호출

    // title 제목
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장`;
    }, []);

    useEffect(() => {
        // console.log(curDate);
        axios.get("http://localhost/diary/diary_list", {
            params: {
                curDate: curDate
            }
        }).then((result) => {
            setData(dispatch(getDiaryList(result.data)).payload);
        })
    }, []);

    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
    }

    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
    }

    
    console.log(data);

    return (
        <div>
            <MyHeader
                headText={headText}
                leftChild={<MyButton text={"<"} onClick={decreaseMonth} />} rightChild={<MyButton text={">"} onClick={increaseMonth} />}
            />

            <DiaryList diaryList={data} />
        </div>
    );
};

export default Home;

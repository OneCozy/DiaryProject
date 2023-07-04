import MyButton from '../components/MyButton';
import MyHeader from '../components/MyHeader';
import DiaryList from '../components/DiaryList';

const HomePresenter = ({ data, headText, curDate, increaseMonth, decreaseMonth }) => {
    
    return (
        <div>
            <MyHeader headText={headText} leftChild={<MyButton text={"<"} onClick={decreaseMonth} />} rightChild={<MyButton text={">"}
                onClick={increaseMonth} />} />

            <DiaryList diaryList={data} curDate={curDate} />
        </div>
    );
};

export default HomePresenter;
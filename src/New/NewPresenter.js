import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const NewPresenter = ({ onCreate, newDiaryList }) => {
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - 새 일기`;
    }, []);

    return (
        <div>
            <DiaryEditor onCreate={onCreate} />
        </div>
    );
};

export default NewPresenter;

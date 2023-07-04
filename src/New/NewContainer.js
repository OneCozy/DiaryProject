import axios from 'axios'
import { atom, useRecoilState } from 'recoil';

import NewPresenter from './NewPresenter';

export const newDiary = atom({
    key: "newDiary",
    default: []
});

const NewContainer = () => {

    const [newDiaryList, setNewDiaryList] = useRecoilState(newDiary);

    const onCreate = (date, content, emotion) => {
        axios
            .get("http://localhost/diary/createDiary", {
                params: {
                    content: content,
                    emotion: emotion
                }
            })
            .then((result) => {
                setNewDiaryList(result.data);
            });
    }

    return (
        <NewPresenter
            onCreate={onCreate}
            newDiaryList = {newDiaryList}
        />
    )
}

export default NewContainer;
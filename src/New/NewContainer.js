import axios from 'axios'
import { useRecoilState } from 'recoil';

import NewPresenter from './NewPresenter';
import { newDiary } from '../states/diaryState';

const NewContainer = () => {

    const [newDiaryList, setNewDiaryList] = useRecoilState(newDiary);

    const onCreate = (content, emotion) => {
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
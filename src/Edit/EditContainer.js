import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';

import { diaryList, origin } from '../states/diaryState';
import EditPresenter from './EditPresenter';



const EditContainer = () => {

    const [originData, setOriginData] = useRecoilState(origin);
    const [list, setList] = useRecoilState(diaryList);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (list.length >= 1) {
            const targetDiary = list.find((it) => parseInt(it.id) === parseInt(id));

            if (targetDiary) {
                // targetDiary가 객체라면 true
                setOriginData(targetDiary);
                console.log(originData);
            } else {
                // targetDiary가 undefined, 즉 list에 없다면 false
                alert("없는 일기 입니다.");
                navigate("/", { replace: true });
            }
        }
    }, []);

    const onEdit = (targetId, content, emotion) => {
        axios
            .get("http://localhost/diary/updateDiary", {
                params: {
                    id: targetId,
                    content: content,
                    emotion: emotion
                }
            });
    }

    const onRemove = (targetId) => {
        axios
            .get("http://localhost/diary/deleteDiary", {
                params: {
                    id: targetId
                }
            });
    }

    return (
        <EditPresenter
            originData={originData}
            onEdit={onEdit}
            onRemove={onRemove}
        />
    );
}

export default EditContainer;
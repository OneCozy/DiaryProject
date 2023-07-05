import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import MyButton from './MyButton';
import MyHeader from './MyHeader'
import { emotionList } from '../util/emotion';
import EmotionItem from './EmotionItem';
import { useCallback, useEffect, useRef } from 'react';
import { default_content, default_date, default_emotion } from '../states/diaryState';
import axios from 'axios';
import { getStringDate } from '../util/date';

const DiaryEditor = ({ onCreate, isEdit, originData, onEdit }) => {
    const [date, setDate] = useRecoilState(default_date);
    const [content, setContent] = useRecoilState(default_content);
    const [emotion, setEmotion] = useRecoilState(default_emotion);
    const contentRef = useRef();

    useEffect(() => {
        console.log("date: " + originData.date);
        console.log("emotion: " + originData.emotion);
        console.log("content: " + originData.content);
    }, []);

    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion);
    }, []);

    const navigate = useNavigate();

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if (window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
            if (!isEdit) {
                onCreate(date, content, emotion);
            } else {
                onEdit(originData.id, content, emotion);
            }
        }

        navigate("/", { replace: true });
    };

    const handleRemove = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            
        }
    }

    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(originData.date)));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData]);

    return (
        <div className="DiaryEditor">
            <MyHeader
                headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
                leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
                rightChild={<MyButton text={"삭제하기"} type={"negative"} onClick={handleRemove} />}
            />

            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input type="date" className="input_data" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                </section>

                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem key={it.emotion_id} {...it} onClick={handleClickEmote} isSelected={it.emotion_id === emotion} />
                        ))}
                    </div>
                </section>

                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea placeholder="오늘은 어땠나요?" ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                </section>

                <section>
                    <div className="control_box">
                        <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
                        <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;
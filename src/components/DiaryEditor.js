import { useNavigate } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil';

import MyButton from './MyButton';
import MyHeader from './MyHeader'
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';
import EmotionItem from './EmotionItem';
import { useCallback, useRef } from 'react';

const DiaryEditor = ({ onCreate }) => {

    const [date, setDate] = useRecoilState(
        atom({
            key: "date",
            default: getStringDate(new Date())
        })
    );

    const [content, setContent] = useRecoilState(
        atom({
            key: "content",
            default: ""
        })
    );

    const [emotion, setEmotion] = useRecoilState(
        atom({
            key: "emotion",
            default: 3
        })
    );

    const contentRef = useRef();
    
    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion);
    }, [])
    
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if (window.confirm("새로운 일기를 작성하시겠습니까?")) {
            onCreate(date, content, emotion);
        }

        navigate('/', { replace: true });
    }

    // const handleRemove = () => {
    //     if (window.confirm('정말 삭제하시겠습니까?')) {
    //         onRemove
    //     }
    // }

    return (
        <div className='DiaryEditor'>
            <MyHeader
                leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
            />

            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input type="date" className='input_data' value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                </section>

                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem
                                key={it.emotion_id} {...it}
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                            placeholder='오늘은 어땠나요?'
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>

                <section>
                    <div className='control_box'>
                        <MyButton text={'취소하기'} onClick={() => navigate(-1)} />
                        <MyButton text={'작성완료'} type={'positive'} onClick={handleSubmit} />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DiaryEditor;
import { atom } from 'recoil';
import { getStringDate } from '../util/date';

/* HomeContainer.js */
export const diaryList = atom({
    key: "diaryList",
    default: []
});

/* NewContainer.js */
export const newDiary = atom({
    key: "newDiary",
    default: []
});

/* DiaryEditor.js */
export const default_date = atom({
    key: "default_date",
    default: getStringDate(new Date())
});

export const default_content = atom({
    key: "default_content",
    default: ""
});

export const default_emotion = atom({
    key: "default_emotion",
    default: 3
});

/* EditContainer.js */
export const origin = atom({
    key: "origin",
    default: []
});

/* DiaryList.js */
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
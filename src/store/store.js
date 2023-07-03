import { configureStore, createSlice } from '@reduxjs/toolkit';

const diaryList = createSlice({
    name: "diaryList",
    initialState: [],
    reducers: {
        getDiaryList(state, action) {
            return action.payload;
        }
    }
});

const sortType = createSlice({
    name: "sortType",
    initialState: "latest",
    reducers: {
        setSortType(state, action) {
            return action.payload;
        }
    }
});

const filter = createSlice({
    name: "filter",
    initialState: "all",
    reducers: {
        setFilter(state, action) {
            return action.payload;
        }
    }
});

const sortedList = createSlice({
    name: "sortedList",
    initialState: [],
    reducers: {
        setSortedList(state, action) {
            return action.payload;
        }
    }
});

export const { getDiaryList } = diaryList.actions;
export const { setSortType } = sortType.actions;
export const { setFilter } = filter.actions;
export const { setSortedList } = sortedList.actions;

export default configureStore({
    reducer: {
        diaryList: diaryList.reducer,
        sortType: sortType.reducer,
        filter: filter.reducer,
        sortedList: sortedList.reducer
    }
}); 
import { createSlice } from '@reduxjs/toolkit';
import { sortValues } from 'helpers/functions';

const initialState = {
  historyItems: [],
  leadersOfCurrentDay: [],
  error: null,
  day: 0,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    initDays(state, action) {
      state.historyItems = sortValues(action.payload, 'time');
    },
    setLeadersOfCurrentDay(state, action) {
      state.leadersOfCurrentDay = action.payload;
    },
    addDay(state, action) {
      state.historyItems.push({ ...action.payload });
    },
    changeDay(state, action) {
      state.day = action.payload;
    },
    errorDay(state, action) {
      state.error = action.payload;
    },
  },
});

export const { initDays, setLeadersOfCurrentDay, addDay, changeDay, errorDay } = historySlice.actions;

export default historySlice.reducer;

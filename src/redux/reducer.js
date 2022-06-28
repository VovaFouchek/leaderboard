import { createSlice } from '@reduxjs/toolkit';
import { orderTypes } from 'helpers/consts';
import { reverseOrderType, sortListByOrder } from 'helpers/functions';

const initialState = {
  leaders: [],
  sortType: orderTypes.ascending,
  isLoading: false,
  error: null,
};

const getLeadersWithPositions = (sortedList, sortType = initialState.sortType) =>
  sortedList.map((item, index) => ({
    ...item,
    position: sortType === orderTypes.ascending ? index + 1 : sortedList.length - index,
  }));

const setPositionsAndSortedList = (leaderList, sortType = initialState.sortType) => {
  const newSortedLeadersList = sortListByOrder(leaderList, sortType);
  return getLeadersWithPositions(newSortedLeadersList, sortType);
};

const leaderSlice = createSlice({
  name: 'leader',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    initLeaders(state, action) {
      state.leaders = setPositionsAndSortedList(action.payload, state.sortType);
      state.isLoading = false;
    },
    leadersFetchingError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    sortLeaders(state) {
      state.sortType = reverseOrderType(state.sortType);
      state.leaders = sortListByOrder(state.leaders, state.sortType);
    },
    addLeader(state, action) {
      const newLeader = { ...action.payload, position: state.leaders.length + 1 };
      const listWithNewLeader = [...state.leaders, newLeader];
      state.leaders = setPositionsAndSortedList(listWithNewLeader, state.sortType);
    },
    editLeader(state, action) {
      const newLeadersList = state.leaders.map(leader => (leader.id === action.payload.id ? action.payload : leader));
      state.leaders = setPositionsAndSortedList(newLeadersList, state.sortType);
    },
  },
});

export const { startLoading, initLeaders, leadersFetchingError, sortLeaders, addLeader, editLeader } =
  leaderSlice.actions;

export default leaderSlice.reducer;

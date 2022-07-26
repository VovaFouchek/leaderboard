import { createSlice } from '@reduxjs/toolkit';

import { orderTypes } from 'helpers/consts';
import { reverseOrderType, sortListByOrder } from 'helpers/functions';

const initialState = {
  leaderboardList: [],
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
  name: 'leaderboard',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setLeaders(state, action) {
      state.leaderboardList = setPositionsAndSortedList(action.payload, state.sortType);
      state.isLoading = false;
    },
    leadersFetchingError(state, action) {
      state.error = action.payload;
      state.isLoading = true;
    },
    sortLeaders(state) {
      state.sortType = reverseOrderType(state.sortType);
      state.leaderboardList = sortListByOrder(state.leaderboardList, state.sortType);
    },
    addLeader(state, action) {
      const newLeader = { ...action.payload, position: state.leaderboardList.length + 1 };
      const listWithNewLeader = [...state.leaderboardList, newLeader];
      state.leaderboardList = setPositionsAndSortedList(listWithNewLeader, state.sortType);
    },
    editLeader(state, action) {
      const newLeadersList = state.leaderboardList.map(leader =>
        leader.id === action.payload.id ? action.payload : leader
      );
      state.leaderboardList = setPositionsAndSortedList(newLeadersList, state.sortType);
    },
  },
});

export const { startLoading, setLeaders, leadersFetchingError, sortLeaders, addLeader, editLeader } =
  leaderSlice.actions;

export default leaderSlice.reducer;

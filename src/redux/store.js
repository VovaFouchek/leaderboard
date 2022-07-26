import { configureStore } from '@reduxjs/toolkit';

import historyReducer from 'redux/history/reducer';
import leaderReducer from 'redux/leader/reducer';

const store = configureStore({
  reducer: {
    leaderboard: leaderReducer,
    history: historyReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
});

export default store;

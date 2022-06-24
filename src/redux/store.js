import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import leaderReducer from 'redux/reducer';

export const store = configureStore({
  reducer: {
    leader: leaderReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

import axios from 'axios';

import { setZeroScore } from 'helpers/functions';
import { setLeadersOfCurrentDay } from 'redux/history/reducer';
import { startLoading, leadersFetchingError, setLeaders } from 'redux/leader/reducer';
import { API } from 'shared/api/config/leaders.api';

export const fetchLeaders = () => async dispatch => {
  try {
    dispatch(startLoading());
    const response = await axios.get(`${API.LEADERS}`);
    const preparedData = setZeroScore(response.data);
    dispatch(setLeaders(preparedData));
    dispatch(setLeadersOfCurrentDay(preparedData));
  } catch (error) {
    dispatch(leadersFetchingError(error.message));
  }
};

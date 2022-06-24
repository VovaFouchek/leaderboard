import axios from 'axios';
import { setZeroScore } from 'helpers/functions';
import { API } from 'shared/api/config/leaders.api';
import { startLoading, initLeaders, leadersFetchingError } from 'redux/reducer';

export const fetchLeaders = () => async dispatch => {
  try {
    dispatch(startLoading());
    const response = await axios.get(`${API.LEADERS}`);
    const preparedData = setZeroScore(response.data);
    dispatch(initLeaders(preparedData));
  } catch (e) {
    dispatch(leadersFetchingError(e.message));
  }
};

import axios from 'axios';
import uniqid from 'uniqid';

import { addDay, errorDay, initDays } from 'redux/history/reducer';
import { API } from 'shared/api/config/leaders.api';

export const getHistory = () => async dispatch => {
  try {
    const response = await axios.get(`${API.DAYS}`);
    dispatch(initDays(response.data));
  } catch (error) {
    dispatch(errorDay(error.message));
  }
};

export const addNewDay = data => async dispatch => {
  try {
    const response = await axios.post(`${API.DAYS}`, {
      id: uniqid(),
      time: new Date().getTime(),
      leaders: data,
    });
    dispatch(addDay(response.data));
  } catch (error) {
    dispatch(errorDay(error.message));
  }
};

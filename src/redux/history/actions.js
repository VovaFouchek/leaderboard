import axios from 'axios';
import uniqid from 'uniqid';
import { API } from 'shared/api/config/leaders.api';
import { addDay, errorDay, initDays } from 'redux/history/reducer';

export const getHistory = () => async dispatch => {
  try {
    const response = await axios.get(`${API.DAYS}`);
    dispatch(initDays(response.data));
  } catch (e) {
    dispatch(errorDay(e.message));
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
  } catch (e) {
    dispatch(errorDay(e.message));
  }
};

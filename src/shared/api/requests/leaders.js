import { getRandomPhoto } from 'helpers/functions';

import axios from '../config/axios';
import { API } from '../config/leaders.api';

export const getLeaderByID = async id => {
  try {
    const response = await axios.get(`${API.LEADERS}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createLeader = async data => {
  try {
    const response = await axios.post(`${API.LEADERS}`, {
      name: data.name,
      score: +data.score,
      picture: getRandomPhoto() || 'default__avatar',
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateLeader = async data => {
  try {
    const response = await axios.patch(`${API.LEADERS}/${data.id}`, {
      name: data.name,
      score: +data.score,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

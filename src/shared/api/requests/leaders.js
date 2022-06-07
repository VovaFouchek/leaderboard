import axios, { axiosConfig } from '../config/axios';
import { API } from '../config/leaders.api';

export const getLeaders = async () => {
  try {
    const response = await axios.get(`${axiosConfig.baseURL}${API.LEADERS}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const createLeader = async data => {
  try {
    const response = await axios.post(`${axiosConfig.baseURL}${API.LEADERS}`, {
      name: data.name,
      score: +data.score,
      picture: data.picture,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateLeader = async data => {
  try {
    const response = await axios.patch(`${axiosConfig.baseURL}${API.LEADERS}/${data.id}`, {
      name: data.name,
      score: +data.score,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

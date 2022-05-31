import axios from '../config/axios';
import { API } from '../config/leaders.api';

export const createLeader = async data => {
  const response = await axios.post(API.USER, {
    username: data.name,
  });
  return response.data;
};

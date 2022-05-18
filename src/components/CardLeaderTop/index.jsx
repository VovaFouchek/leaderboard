import React from 'react';
import s from './cardLeaderTop.module.scss';
import { getRandomPhoto } from '../../helpers/functions.js';

export const CardLeaderTop = ({ leader }) => {
  return (
    <div className={s.card}>
      <img src={leader.picture} alt="avatar" />
      <h3>{leader.score}</h3>
      <p>{leader.name}</p>
    </div>
  );
};

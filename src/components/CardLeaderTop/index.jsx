import React from 'react';
import PropTypes from 'prop-types';
import s from './cardLeaderTop.module.scss';

export const CardLeaderTop = ({ leader }) => {
  return (
    <div className={s.card}>
      <img src={leader.picture} alt="avatar" />
      <h3>{leader.score}</h3>
      <p>{leader.name}</p>
    </div>
  );
};

CardLeaderTop.propTypes = {
  leader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }),
};

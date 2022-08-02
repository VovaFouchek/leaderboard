import PropTypes from 'prop-types';

import { leaderDefaultValue } from 'helpers/consts';
import { getImagePath } from 'helpers/functions';

import s from './cardLeaderTop.module.scss';

export const CardLeaderTop = ({ leader = leaderDefaultValue }) => {
  return (
    <div className={s.card}>
      <img src={getImagePath(leader.picture)} className={s.card__picture} alt="avatar" />
      <h3 className={s.card__title}>{leader.score}</h3>
      <p className={s.card__text}>{leader.name}</p>
    </div>
  );
};

CardLeaderTop.propTypes = {
  leader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
};

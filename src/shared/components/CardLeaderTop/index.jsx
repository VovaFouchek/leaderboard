import PropTypes from 'prop-types';
import { getImagePath } from 'helpers/functions';
import s from './cardLeaderTop.module.scss';

const leaderDefaultValue = { name: '', score: 0, position: 0, id: '', picture: '' };

export const CardLeaderTop = ({ leader = leaderDefaultValue }) => {
  return (
    <div className={s.card}>
      <img src={getImagePath(leader.picture)} alt="avatar" />
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

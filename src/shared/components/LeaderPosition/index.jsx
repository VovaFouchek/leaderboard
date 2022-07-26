import { useMemo } from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import s from 'components/Leader/leader.module.scss';
import { leaderDefaultValue, diffrencePositionIcons } from 'helpers/consts';
import { getHistoryList } from 'redux/history/selectors';

const LeaderPosition = ({ leader = leaderDefaultValue }) => {
  const { historyItems } = useSelector(getHistoryList);

  const findLeaderPosition = useMemo(
    () => historyItems[0]?.leaders.find(historyItemLeader => historyItemLeader.id === leader.id),
    [leader]
  );

  const positionDifference = findLeaderPosition && findLeaderPosition.position - leader.position;

  const posititonInfo = {
    increase: {
      positionValue: positionDifference,
      arrowPath: diffrencePositionIcons.upArrow,
    },
    decrease: {
      positionValue: positionDifference,
      arrowPath: diffrencePositionIcons.downArrow,
    },
    noChange: {
      positionValue: 'No change',
      arrowPath: diffrencePositionIcons.middleArrow,
    },
  };

  const differencePositionType = () => {
    if (positionDifference > 0) {
      return 'increase';
    }
    if (positionDifference < 0) {
      return 'decrease';
    }
    return 'noChange';
  };

  return (
    <div className={s.leader__difference}>
      <img src={posititonInfo[differencePositionType()].arrowPath} alt="arrow" />
      <p>{posititonInfo[differencePositionType()].positionValue}</p>
    </div>
  );
};

export default LeaderPosition;

LeaderPosition.propTypes = {
  leader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
};

import { useState } from 'react';
import PropTypes from 'prop-types';

import { BsPencil } from 'react-icons/bs';
import { BasicModal } from 'shared/components/BasicModal';
import { getImagePath, ordinalSuffixOf } from 'helpers/functions';
import { pathRouters } from 'utility/pathRouters';
import { useSelector } from 'react-redux';
import EditForm from 'components/EditForm';
import s from './leader.module.scss';

const leaderDefaultValue = { name: '', score: 0, position: 0, id: '', picture: '' };

const Leader = ({ leader = leaderDefaultValue }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const position = ordinalSuffixOf(leader.position);
  const routers = pathRouters();
  const { historyItems, day } = useSelector(state => state.history);
  const redirectToLeaderProfile = () => day === historyItems.length && routers.setPath(leader.id);

  const findLeaderPosition = historyItems[0]?.leaders.find(person => person.id === leader.id);

  const checkDifferenceOfPosition = person => {
    const positionDifference = findLeaderPosition && findLeaderPosition.position - person.position;
    if (positionDifference > 0) {
      return (
        <div>
          <img src="images/green__arrow.png" alt="arrow" />
          <p>+{positionDifference}</p>
        </div>
      );
    }
    if (positionDifference < 0) {
      return (
        <div>
          <img src="images/red__arrow.png" alt="arrow" />
          <p>{positionDifference}</p>
        </div>
      );
    }
    return (
      <div>
        <img src="images/yellow__arrow.png" alt="arrow" />
        <div>No change</div>
      </div>
    );
  };

  return (
    <tr>
      <td className={s.position}>{position}</td>
      <td className={s.photo}>
        <img src={getImagePath(leader.picture)} aria-hidden onClick={redirectToLeaderProfile} alt="avatar" />
      </td>
      <td className={s.leader}>
        <span aria-hidden onClick={redirectToLeaderProfile}>
          {leader.name}
        </span>
      </td>
      <td className={s.score}>{leader.score}</td>
      {day === historyItems.length && (
        <td className={s.edit}>
          <BsPencil onClick={handleOpen} />
          <BasicModal handleClose={handleClose} open={open}>
            <EditForm leader={leader} handleClose={handleClose} />
          </BasicModal>
        </td>
      )}
      <td className={s.diffrence}>{checkDifferenceOfPosition(leader)}</td>
    </tr>
  );
};

Leader.propTypes = {
  leader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
};

export default Leader;

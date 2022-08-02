import { useState } from 'react';

import PropTypes from 'prop-types';
import { BsPencil } from 'react-icons/bs';
import { useSelector } from 'react-redux';

import EditForm from 'components/EditForm';
import { leaderDefaultValue } from 'helpers/consts';
import { getImagePath, ordinalSuffixOf } from 'helpers/functions';
import { getHistoryList } from 'redux/history/selectors';
import { BasicModal } from 'shared/components/BasicModal';
import LeaderPosition from 'shared/components/LeaderPosition';
import { pathRouters } from 'utility/pathRouters';

import s from './leader.module.scss';

const Leader = ({ leader = leaderDefaultValue }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const routers = pathRouters();
  const position = ordinalSuffixOf(leader.position);

  const { historyItems, day } = useSelector(getHistoryList);
  const historyLength = historyItems.length;
  const isLastDay = day === historyLength;

  const redirectToLeaderProfile = () => day === historyItems.length && routers.setPath(leader.id);

  return (
    <tr className={s.leader}>
      <td className={s.leader__position}>{position}</td>
      <td className={s.leader__photo_wrap}>
        <img
          src={getImagePath(leader.picture)}
          onClick={redirectToLeaderProfile}
          className={s.leader__photo}
          aria-hidden
          alt="avatar"
        />
      </td>
      <td>
        <span className={s.leader__name} aria-hidden onClick={redirectToLeaderProfile}>
          {leader.name}
        </span>
      </td>
      <td className={s.leader__score}>{leader.score}</td>
      {isLastDay && (
        <td className={s.edit}>
          <BsPencil className={s.leader__img_pencil} onClick={handleOpen} />
          <BasicModal handleClose={handleClose} open={open}>
            <EditForm leader={leader} handleClose={handleClose} />
          </BasicModal>
        </td>
      )}
      <td>
        <LeaderPosition leader={leader} />
      </td>
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

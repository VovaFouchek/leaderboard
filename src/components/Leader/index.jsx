import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsPencil } from 'react-icons/bs';
import { pathRouters } from '../../utility/pathRouters';

import { BasicModal } from '../BasicModal';
import { EditForm } from '../EditForm';

import s from './leader.module.scss';

const leaderDefaultValue = { name: '', score: 0, position: 0, id: '', picture: '' };

export const Leader = ({ leader = leaderDefaultValue, position = '', editLeaderInList }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const routers = pathRouters();

  return (
    <tr>
      <td className={s.position}>{position}</td>
      <td className={s.photo}>
        <img
          src={leader.picture}
          aria-hidden="true"
          onClick={() => {
            routers.setPath(leader.id);
          }}
          alt="avatar"
        />
      </td>
      <td className={s.leader}>
        <span
          aria-hidden="true"
          onClick={() => {
            routers.setPath(leader.id);
          }}
        >
          {leader.name}
        </span>
      </td>
      <td className={s.score}>{leader.score}</td>
      <td className={s.edit}>
        <BsPencil onClick={handleOpen} />
        <BasicModal handleClose={handleClose} open={open}>
          <EditForm leader={leader} handleClose={handleClose} editLeaderInList={editLeaderInList} />
        </BasicModal>
      </td>
    </tr>
  );
};

Leader.propTypes = {
  leader: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  position: PropTypes.string.isRequired,
  editLeaderInList: PropTypes.func.isRequired,
};

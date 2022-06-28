import { useState } from 'react';
import PropTypes from 'prop-types';

import { BsPencil } from 'react-icons/bs';
import { BasicModal } from 'shared/components/BasicModal';
import { getImagePath, ordinalSuffixOf } from 'helpers/functions';
import { pathRouters } from 'utility/pathRouters';
import EditForm from 'components/EditForm';
import s from './leader.module.scss';

const leaderDefaultValue = { name: '', score: 0, position: 0, id: '', picture: '' };

const Leader = ({ leader = leaderDefaultValue }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const position = ordinalSuffixOf(leader.position);
  const routers = pathRouters();

  return (
    <tr>
      <td className={s.position}>{position}</td>
      <td className={s.photo}>
        <img
          src={getImagePath(leader.picture)}
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
          <EditForm leader={leader} handleClose={handleClose} />
        </BasicModal>
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

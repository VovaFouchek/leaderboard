import { useState } from 'react';
import { BsPencil } from 'react-icons/bs';

import { BasicModal } from '../BasicModal';
import { EditForm } from '../EditForm';

import s from './leader.module.scss';

export const Leader = ({ leader, number, editLeaderInList }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <tr>
      <td className={s.position}>{number}</td>
      <td className={s.photo}>
        <img src={leader.picture} alt="avatar" />
      </td>
      <td className={s.leader}>{leader.name}</td>
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

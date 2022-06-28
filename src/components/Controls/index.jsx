import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { BasicModal } from 'shared/components/BasicModal';
import { sortLeaders } from 'redux/reducer';
import AddForm from 'components/AddForm';
import s from './controls.module.scss';

const Controls = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const sortedLeaders = () => dispatch(sortLeaders());

  return (
    <div className={s.wrapControl}>
      <strong>Leaders table for this period</strong>
      <button type="button" onClick={sortedLeaders}>
        Sort by
      </button>
      <button type="button" onClick={handleOpen}>
        Add new member
      </button>
      <BasicModal handleClose={handleClose} open={open}>
        <AddForm handleClose={handleClose} />
      </BasicModal>
    </div>
  );
};

export default Controls;

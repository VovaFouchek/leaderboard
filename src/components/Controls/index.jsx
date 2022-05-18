import React, { useState } from 'react';
import { AddForm } from '../AddForm';
import { BasicModal } from '../BasicModal';
import s from './controls.module.scss';

export const Controls = ({ sortListByOrder, addList }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={s.wrapControl}>
      <strong>Leaders table for this period</strong>
      <button type="button" onClick={sortListByOrder}>
        Sort by
      </button>
      <button type="button" onClick={handleOpen}>
        Add new member
      </button>
      <BasicModal handleClose={handleClose} open={open}>
        <AddForm handleClose={handleClose} addList={addList} />
      </BasicModal>
    </div>
  );
};

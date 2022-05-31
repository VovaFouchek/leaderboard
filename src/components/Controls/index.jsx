import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AddForm } from '../AddForm';
import { BasicModal } from '../../shared/components/BasicModal';
import s from './controls.module.scss';

export const Controls = ({ sortListByOrder, addLeaderInList }) => {
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
        <AddForm handleClose={handleClose} addLeaderInList={addLeaderInList} />
      </BasicModal>
    </div>
  );
};

Controls.propTypes = {
  sortListByOrder: PropTypes.func.isRequired,
  addLeaderInList: PropTypes.func.isRequired,
};

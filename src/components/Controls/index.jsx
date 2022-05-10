import React from 'react';
import s from './controls.module.scss';

export const Controls = ({ sortListByOrder }) => {
  return (
    <div className={s.wrapControl}>
      <strong>Leaders table for this period</strong>
      <button type="submit" onClick={sortListByOrder}>
        Sort by
      </button>
    </div>
  );
};

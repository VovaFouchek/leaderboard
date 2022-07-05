import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BasicModal } from 'shared/components/BasicModal';
import { sortLeaders } from 'redux/leader/reducer';
import AddForm from 'components/AddForm';

import { Button } from '@mui/material';
import { addNewDay } from 'redux/history/actions';
import { changeDay } from 'redux/history/reducer';
import s from './controls.module.scss';

const Controls = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { historyItems, day, leadersOfCurrentDay } = useSelector(state => state.history);
  const sortedLeaders = () => dispatch(sortLeaders());
  const changeToPreviousDay = () => dispatch(changeDay(day - 1));
  const changeToNextDay = () => dispatch(changeDay(day + 1));
  const addNewDayToHistory = () => dispatch(addNewDay(leadersOfCurrentDay));
  const getDifference = (array1, array2) => JSON.stringify(array1) === JSON.stringify(array2);

  return (
    <div className={s.wrapControl}>
      <strong>Leaders table for this period</strong>
      <Button
        variant="contained"
        onClick={sortedLeaders}
        sx={{
          maxWidth: '140px',
          backgroundColor: '#8201d0',
          fontSize: '13px',
          textTransform: 'inherit',
          '&:hover': {
            backgroundColor: '#9700dd',
          },
        }}
      >
        Sort by
      </Button>

      <Button
        variant="contained"
        onClick={changeToPreviousDay}
        disabled={day === 0}
        sx={{
          maxWidth: '140px',
          backgroundColor: '#4c16d0',
          fontSize: '13px',
          textTransform: 'inherit',
          '&:hover': {
            backgroundColor: '#7239ff',
          },
        }}
      >
        Previous day
      </Button>

      <Button
        variant="contained"
        onClick={changeToNextDay}
        disabled={day === historyItems.length}
        sx={{
          maxWidth: '140px',
          backgroundColor: '#4c16d0',
          fontSize: '13px',
          textTransform: 'inherit',
          '&:hover': {
            backgroundColor: '#7239ff',
          },
        }}
      >
        Next day
      </Button>

      <Button
        variant="contained"
        onClick={handleOpen}
        disabled={day !== historyItems.length}
        sx={{
          maxWidth: '140px',
          backgroundColor: '#8201d0',
          fontSize: '13px',
          textTransform: 'inherit',
          display: day === historyItems.length ? 'block' : 'none',
          '&:hover': {
            backgroundColor: '#9700dd',
          },
        }}
      >
        Add new member
      </Button>

      <Button
        variant="contained"
        onClick={addNewDayToHistory}
        disabled={historyItems && getDifference(leadersOfCurrentDay, historyItems.at(-1)?.leaders)}
        sx={{
          maxWidth: '140px',
          backgroundColor: '#8201d0',
          fontSize: '13px',
          textTransform: 'inherit',
          display: day === historyItems.length ? 'block' : 'none',
          '&:hover': {
            backgroundColor: '#9700dd',
          },
        }}
      >
        Add new day
      </Button>

      <BasicModal handleClose={handleClose} open={open}>
        <AddForm handleClose={handleClose} />
      </BasicModal>
    </div>
  );
};

export default Controls;

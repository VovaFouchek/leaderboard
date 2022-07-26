import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import AddForm from 'components/AddForm';
import { btnColors } from 'helpers/consts';
import { isDifferenceArray } from 'helpers/functions';
import { addNewDay } from 'redux/history/actions';
import { changeDay } from 'redux/history/reducer';
import { getHistoryList } from 'redux/history/selectors';
import { sortLeaders } from 'redux/leader/reducer';
import { BasicModal } from 'shared/components/BasicModal';
import MainBtn from 'shared/components/MainBtn';

import s from './controls.module.scss';

const Controls = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { historyItems, day, leadersOfCurrentDay } = useSelector(getHistoryList);
  const sortedLeaders = () => dispatch(sortLeaders());
  const changeToPreviousDay = () => dispatch(changeDay(day - 1));
  const changeToNextDay = () => dispatch(changeDay(day + 1));
  const addNewDayToHistory = () => dispatch(addNewDay(leadersOfCurrentDay));

  const historyLength = historyItems.length;
  const isFirstDay = day === 0;
  const isLastDay = day === historyLength;
  const isDataChanged = historyItems && isDifferenceArray(leadersOfCurrentDay, historyItems.at(-1)?.leaders);
  const checkDay = isLastDay ? 'block' : 'none';

  return (
    <div className={s.control__wrap}>
      <strong>Leaders table for this period</strong>
      <MainBtn onClick={sortedLeaders}>Sort by</MainBtn>

      <MainBtn
        onClick={changeToPreviousDay}
        disabled={isFirstDay}
        extraColor={btnColors.extraColorForBtn}
        extraColorHover={btnColors.extraHoverColorForBtn}
      >
        Previous day
      </MainBtn>

      <MainBtn
        onClick={changeToNextDay}
        disabled={isLastDay}
        extraColor={btnColors.extraColorForBtn}
        extraColorHover={btnColors.extraHoverColorForBtn}
      >
        Next day
      </MainBtn>

      <MainBtn onClick={handleOpen} disabled={!isLastDay} option={checkDay}>
        Add new member
      </MainBtn>

      <MainBtn onClick={addNewDayToHistory} disabled={isDataChanged} option={checkDay}>
        Add new day
      </MainBtn>

      <BasicModal handleClose={handleClose} open={open}>
        <AddForm handleClose={handleClose} />
      </BasicModal>
    </div>
  );
};

export default Controls;

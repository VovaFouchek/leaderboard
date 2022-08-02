import { useEffect, useMemo } from 'react';

import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { ordinalSuffixOf } from 'helpers/functions';
import { changeDay } from 'redux/history/reducer';
import { getHistoryList } from 'redux/history/selectors';
import { setLeaders } from 'redux/leader/reducer';
import HistoryBtn from 'shared/components/HistoryBtn';

import s from './history.module.scss';

const History = () => {
  const dispatch = useDispatch();
  const { historyItems, day, leadersOfCurrentDay } = useSelector(getHistoryList);
  const currentDay = index => day === index;

  const leadersOfCurrentDayValue = useMemo(
    () => ({
      id: 0,
      time: new Date().getTime(),
      leaders: [...leadersOfCurrentDay],
    }),
    [leadersOfCurrentDay]
  );

  const fullHistory = [...historyItems, leadersOfCurrentDayValue];
  const changeButtonDay = index => dispatch(changeDay(index));

  useEffect(() => {
    dispatch(changeDay(historyItems.length));
  }, [historyItems]);

  useEffect(() => {
    dispatch(setLeaders(fullHistory[day].leaders));
  }, [day]);

  const getHistoryName = index => {
    const currentLeaderName = 'Current day';
    const historyItemName = `${ordinalSuffixOf(index + 1)} Day`;
    const isCurrentLeaders = historyItems.length === index;
    return isCurrentLeaders ? currentLeaderName : historyItemName;
  };

  return (
    <div className={s.history__wrap}>
      <p className={s.history__title}>History</p>
      <div className={s.history__btn_сontainer}>
        {fullHistory.map((_, index) => (
          <HistoryBtn key={nanoid()} disabled={currentDay(index)} onClick={() => changeButtonDay(index)}>
            {getHistoryName(index)}
          </HistoryBtn>
        ))}
      </div>
    </div>
  );
};

export default History;

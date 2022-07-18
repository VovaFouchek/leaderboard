import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeDay } from 'redux/history/reducer';
import { setLeaders } from 'redux/leader/reducer';
import { Button } from '@mui/material';
import { ordinalSuffixOf } from 'helpers/functions';
import s from './history.module.scss';

const History = () => {
  const dispatch = useDispatch();
  const { historyItems, day, leadersOfCurrentDay } = useSelector(state => state.history);

  const leadersOfCurrentDayValue = {
    id: 0,
    time: new Date().getTime(),
    leaders: [...leadersOfCurrentDay],
  };

  const fullHistory = [...historyItems, leadersOfCurrentDayValue];
  const changeButtonDay = index => dispatch(changeDay(index));

  useEffect(() => {
    dispatch(changeDay(fullHistory.length - 1));
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
    <div className={s.wrap}>
      <p className={s.title}>History</p>
      <div className={s.btn__container}>
        {fullHistory.map((_, index) => (
          <Button
            key={getHistoryName(index)}
            variant="contained"
            disabled={day === index}
            onClick={() => changeButtonDay(index)}
            sx={{
              display: 'inline-block',
              padding: '0',
              marginBottom: '10px',
              maxWidth: '180px',
              backgroundColor: '#8201d0',
              textTransform: 'inherit',
              '&:hover': {
                backgroundColor: '#9700dd',
              },
            }}
          >
            {getHistoryName(index)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default History;

import { useEffect } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';

import { Controls, Header, Leader } from 'components';
import { getHistory } from 'redux/history/actions';
import { getHistoryList } from 'redux/history/selectors';
import { fetchLeaders } from 'redux/leader/actions';
import { getLeaderboardList } from 'redux/leader/selectors';

import s from './board.module.scss';

const Board = () => {
  const dispatch = useDispatch();
  const { leaderboardList, isLoading } = useSelector(getLeaderboardList);
  const { historyItems, day } = useSelector(getHistoryList);
  const editing = day === historyItems.length && <th>Editing</th>;

  useEffect(() => {
    dispatch(fetchLeaders());
    dispatch(getHistory());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className={s.board}>
        <Controls />
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Photo</th>
              <th>Leader</th>
              <th>Score</th>
              {editing}
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr className={s.progress__container}>
                <td>
                  <Box className={s.progress__wrap}>
                    <CircularProgress />
                  </Box>
                </td>
              </tr>
            )}
            {leaderboardList.map(leader => (
              <Leader leader={leader} key={leader.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Board;

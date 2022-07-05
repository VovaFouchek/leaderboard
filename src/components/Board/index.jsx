import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { Header, Controls, Leader } from 'components';
import { fetchLeaders } from 'redux/leader/actions';
import { getHistory } from 'redux/history/actions';
import s from './board.module.scss';

const Board = () => {
  const dispatch = useDispatch();
  const { leaders, isLoading } = useSelector(state => state.leader);
  const { historyItems, day } = useSelector(state => state.history);

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
              {day === historyItems.length && <th>Editing</th>}
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr className={s.container}>
                <td>
                  <Box className={s.wrap__progress}>
                    <CircularProgress />
                  </Box>
                </td>
              </tr>
            )}
            {leaders.map(leader => (
              <Leader leader={leader} key={leader.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Board;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { fetchLeaders } from 'redux/actions';
import { Header, Controls, Leader } from 'components';
import s from './board.module.scss';

const Board = () => {
  const dispatch = useDispatch();
  const { leaders, isLoading } = useSelector(state => state.leader);

  useEffect(() => {
    dispatch(fetchLeaders());
  }, []);

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
              <th>Editing</th>
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

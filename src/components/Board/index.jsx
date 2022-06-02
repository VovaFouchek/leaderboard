import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Leader } from '../Leader';
import { orderTypes } from '../../helpers/consts';
import { Controls } from '../Controls';
import * as helpersFuncions from '../../helpers/functions';
import { getLeaders } from '../../shared/api/requests/leaders';
import { Header } from '../Header';

import s from './board.module.scss';

export const Board = ({ list = [], setList }) => {
  const [sortType, setsortType] = useState(orderTypes.ascending);

  const { ordinalSuffixOf, sortListByOrder, reverseOrderType, refreshList } = helpersFuncions;

  const setZeroScore = data => {
    return data.map(item => (!item.score ? { ...item, score: 0 } : item));
  };

  const initedLeader = (item, index) => ({
    ...item,
    position: index + 1,
  });

  const initedList = sortedList => {
    return sortedList.map(initedLeader);
  };

  const getData = async () => {
    const DELAY = 300;
    if (!list.length) {
      setTimeout(async () => {
        const leaders = await getLeaders();
        const preparedData = setZeroScore(leaders);
        const sortedList = sortListByOrder(preparedData, sortType);
        setList(initedList(sortedList));
      }, DELAY);
    }
  };

  const editLeaderInList = editLeader => {
    const newList = list.map(leader => {
      if (leader.id === editLeader.id) {
        return editLeader;
      }
      return leader;
    });
    setList(refreshList(newList, sortType));
  };

  const addLeaderInList = values => {
    const newList = { ...values, position: list.length + 1 };
    const listWithNewLeader = [...list, newList];
    setList(refreshList(listWithNewLeader, sortType));
  };

  const sortList = () => {
    const newsortType = reverseOrderType(sortType);
    setsortType(newsortType);
    setList(sortListByOrder(list, newsortType));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header list={list} setList={setList} />
      <div className={s.board}>
        <Controls sortListByOrder={sortList} addLeaderInList={addLeaderInList} />
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
            {list.length > 0 ? (
              list.map(leader => (
                <Leader
                  leader={leader}
                  editLeaderInList={editLeaderInList}
                  position={ordinalSuffixOf(leader.position)}
                  key={leader.id}
                />
              ))
            ) : (
              <tr className={s.container}>
                <td>
                  <Box className={s.wrap__progress}>
                    <CircularProgress />
                  </Box>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

Board.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape).isRequired,
  setList: PropTypes.func.isRequired,
};

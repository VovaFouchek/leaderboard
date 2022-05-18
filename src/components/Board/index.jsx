import { useEffect, useState } from 'react';
import uniqid from 'uniqid';

import { Leader } from '../Leader';
import instance, { axiosConfig } from '../API';
import {
  ordinalSuffixOf,
  sortListByOrder,
  reverseOrderType,
  refreshList,
  getRandomPhoto,
} from '../../helpers/functions';
import { orderTypes } from '../../helpers/consts';
import { Controls } from '../Controls';

import s from './board.module.scss';

export const Board = ({ list, setList }) => {
  const [sortType, setsortType] = useState(orderTypes.ascending);

  const setZeroScore = data => {
    return data.map(item => (!item.score ? { ...item, score: 0 } : item));
  };

  const getData = async () => {
    const { data } = await instance.get(axiosConfig.baseURL);
    const preparedData = setZeroScore(data);
    const sortedList = sortListByOrder(preparedData, sortType);
    setList(
      sortedList.map((item, index) => ({
        ...item,
        position: index + 1,
        id: uniqid(),
        picture: getRandomPhoto(),
      }))
    );
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
    const newList = { ...values, position: list.length + 1, id: uniqid(), picture: getRandomPhoto() };
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
          {list ? (
            list.map(leader => (
              <Leader
                leader={leader}
                editLeaderInList={editLeaderInList}
                number={ordinalSuffixOf(leader.position)}
                key={leader.id}
              />
            ))
          ) : (
            <> </>
          )}
        </tbody>
      </table>
    </div>
  );
};

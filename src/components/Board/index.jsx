import { useEffect, useState } from 'react';

import { Leader } from '../Leader';
import instance, { axiosConfig } from '../API';
import { ordinalSuffixOf, sortListByOrder, reverseOrderType } from '../../helpers/functions';
import { orderTypes } from '../../helpers/consts';

import { Controls } from '../Controls';
import s from './board.module.scss';

export const Board = () => {
  const [list, setList] = useState([]);
  const [sortValue, setSortValue] = useState(orderTypes.ascending);

  const setZeroScore = data => {
    return data.map(item => (!item.score ? { ...item, score: 0 } : item));
  };

  const getData = async () => {
    const { data } = await instance.get(axiosConfig.baseURL);
    const preparedData = setZeroScore(data);
    setList(
      sortListByOrder(preparedData, sortValue).map((item, index) => ({
        ...item,
        position: index + 1,
        id: index,
      }))
    );
  };

  const editList = editLeader => {
    const newList = list.map(leader => {
      if (leader.id === editLeader.id) {
        return editLeader;
      }
      return leader;
    });

    const newListWithPositions = sortListByOrder(newList, orderTypes.ascending).map((item, index) => ({
      ...item,
      position: index + 1,
    }));

    setList(sortListByOrder(newListWithPositions, sortValue));
  };

  const sortList = () => {
    const newSortValue = reverseOrderType(sortValue);
    setSortValue(newSortValue);
    setList(sortListByOrder(list, newSortValue));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={s.board}>
      <Controls sortListByOrder={sortList} />
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Leader</th>
            <th>Score</th>
            <th>Editing</th>
          </tr>
        </thead>
        <tbody>
          {list ? (
            list.map(leader => (
              <Leader leader={leader} editList={editList} number={ordinalSuffixOf(leader.position)} key={leader.name} />
            ))
          ) : (
            <> </>
          )}
        </tbody>
      </table>
    </div>
  );
};

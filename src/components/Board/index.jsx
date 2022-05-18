import { useEffect, useState } from 'react';
import uniqid from 'uniqid';

import { Leader } from '../Leader';
import instance, { axiosConfig } from '../API';
import { ordinalSuffixOf, sortListByOrder, reverseOrderType, updateList } from '../../helpers/functions';
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
    const sortedList = sortListByOrder(preparedData, sortValue);
    setList(
      sortedList.map((item, index) => ({
        ...item,
        position: index + 1,
        id: uniqid(),
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
    updateList(newList, setList, sortValue);
  };

  const addList = values => {
    const addNewMember = [...list, { ...values, position: list.length + 1, id: uniqid() }];
    updateList(addNewMember, setList, sortValue);
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
      <Controls sortListByOrder={sortList} addList={addList} />
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
              <Leader leader={leader} editList={editList} number={ordinalSuffixOf(leader.position)} key={leader.id} />
            ))
          ) : (
            <> </>
          )}
        </tbody>
      </table>
    </div>
  );
};

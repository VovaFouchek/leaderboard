import { orderTypes } from './consts';

export const ordinalSuffixOf = i => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
};

export const reverseOrderType = sortValue =>
  sortValue === orderTypes.ascending ? orderTypes.descending : orderTypes.ascending;

export const sortListByOrder = (list, sortValue) => {
  if (sortValue === orderTypes.descending) {
    return list.sort((a, b) => {
      if (a.score === b.score) return b.name > a.name ? 1 : -1;
      return a.score - b.score;
    });
  }
  return list.sort((a, b) => {
    if (a.score === b.score) return a.name > b.name ? 1 : -1;
    return b.score - a.score;
  });
};

export const updateList = (data, setList, sortValue) => {
  const sortNewMemberPositions = sortListByOrder(data, orderTypes.ascending).map((item, index) => ({
    ...item,
    position: index + 1,
  }));
  setList(sortListByOrder(sortNewMemberPositions, sortValue));
};

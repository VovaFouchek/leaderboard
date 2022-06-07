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

export const reverseOrderType = sortType =>
  sortType === orderTypes.ascending ? orderTypes.descending : orderTypes.ascending;

export const sortListByOrder = (list, sortType) => {
  if (sortType === orderTypes.descending) {
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

export const refreshList = (list, sortType) => {
  const sortNewMemberPositions = sortListByOrder(list, sortType).map((item, index) => {
    if (sortType === orderTypes.ascending) {
      return { ...item, position: index + 1 };
    }
    return { ...item, position: list.length - index };
  });
  return sortNewMemberPositions;
};

export const getRandomPhoto = () => {
  const pictures = [
    'Ryan-Reynolds',
    'Tom-Holland',
    'Will-Smith',
    'Angelina-Jolie',
    'Gal-Gadot',
    'Sofia-Vergara',
    'Margot-Robbie',
  ];
  return pictures[Math.floor(Math.random() * pictures.length)];
};

export const getImagePath = picture => `/images/people/${picture}.jpeg`;

export const getLeaderTop = listOfLeaders => {
  const COUNT_LEADER_TOP = 4;
  const newList = listOfLeaders.filter(leader => leader.position <= COUNT_LEADER_TOP);
  return sortListByOrder(newList, orderTypes.ascending);
};

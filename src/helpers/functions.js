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

export const sortListByOrder = (list, sortType = orderTypes.ascending) => {
  if (sortType === orderTypes.descending) {
    return [...list].sort((a, b) => {
      if (a.score === b.score) return b.name > a.name ? 1 : -1;
      return a.score - b.score;
    });
  }

  return [...list].sort((a, b) => {
    if (a.score === b.score) {
      return a.name > b.name ? 1 : -1;
    }
    return b.score - a.score;
  });
};

export const reverseOrderType = sortType =>
  sortType === orderTypes.ascending ? orderTypes.descending : orderTypes.ascending;

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
  const filteredLeadersList = listOfLeaders.filter(leader => leader.position <= COUNT_LEADER_TOP);
  return sortListByOrder(filteredLeadersList);
};

export const setZeroScore = data => data.map(item => (!item.score ? { ...item, score: 0 } : item));

export const sortValues = (data, property) => [...data].sort((a, b) => a[property] - b[property]);

export const isDifferenceArray = (firstArray, secondArray) =>
  JSON.stringify(firstArray) === JSON.stringify(secondArray);

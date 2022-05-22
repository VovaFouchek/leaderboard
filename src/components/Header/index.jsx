import { useState, useEffect } from 'react';
import { CardLeaderTop } from '../CardLeaderTop';
import { getLeaderTop } from '../../helpers/functions';

import image from '../../images/business-people.svg';
import s from './header.module.scss';

export const Header = ({ list }) => {
  const [leaderTop, setleaderTop] = useState([]);

  useEffect(() => {
    setleaderTop(getLeaderTop(list));
  }, [list]);

  return (
    <>
      <div className={s.banner}>
        <p className={s.text}>All time Highest Scorers</p>
        <div className={s.container__card}>
          {leaderTop ? leaderTop.map(leader => <CardLeaderTop leader={leader} key={leader.id} />) : <> </>}
        </div>
        <img className={s.banner__img} src={image} alt="Business people" />
      </div>
      <h1 className={s.title}>LeaderBoard:</h1>
    </>
  );
};

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { CardLeaderTop } from '../CardLeaderTop';
import { getLeaderTop } from '../../helpers/functions';

import image from '../../images/business-people.svg';
import s from './header.module.scss';

export const Header = ({ list = [] }) => {
  const [leaderTop, setleaderTop] = useState([]);

  useEffect(() => {
    setleaderTop(getLeaderTop(list));
    if (list.length > 0) {
      localStorage.setItem('TopLeaders', JSON.stringify(getLeaderTop(list)));
    }
    setleaderTop(JSON.parse(localStorage.getItem('TopLeaders')));
  }, [list]);

  return (
    <>
      <div className={s.banner}>
        <p className={s.text}>All time Highest Scorers</p>
        <div className={s.container__card}>
          {leaderTop?.length ? (
            leaderTop.map(leader => <CardLeaderTop leader={leader} key={leader.id} />)
          ) : (
            <Box className={s.wrap__progress}>
              <CircularProgress />
            </Box>
          )}
        </div>
        <img className={s.bg__img} src={image} alt="Business people" />
      </div>
      <h1 className={s.title}>LeaderBoard:</h1>
    </>
  );
};

Header.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

import History from 'components/History';
import { getLeaderboardList, getLeaderboardTop } from 'redux/leader/selectors';
import { CardLeaderTop } from 'shared/components/CardLeaderTop';

import s from './header.module.scss';

const Header = () => {
  const { isLoading } = useSelector(getLeaderboardList);
  const leaderboardList = useSelector(getLeaderboardTop);

  return (
    <>
      <div className={s.banner}>
        <p className={s.banner__text}>All time Highest Scorers</p>
        <div className={s.card__container}>
          {isLoading && (
            <Box className={s.progress__wrap}>
              <CircularProgress />
            </Box>
          )}
          {leaderboardList?.length ? (
            leaderboardList.map(leader => <CardLeaderTop leader={leader} key={leader.id} />)
          ) : (
            <h2>No leaders</h2>
          )}
          <History />
        </div>
        <img className={s.banner__picture} src="images/people/business-people.svg" alt="Business people" />
      </div>
      <h1 className={s.title}>LeaderBoard:</h1>
    </>
  );
};

export default Header;

import { useSelector } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { CardLeaderTop } from 'shared/components/CardLeaderTop';
import { getLeaderTop } from 'helpers/functions';

import s from './header.module.scss';

const Header = () => {
  const { isLoading } = useSelector(state => state.leader);
  const leaders = useSelector(state => getLeaderTop(state.leader.leaders));

  return (
    <>
      <div className={s.banner}>
        <p className={s.text}>All time Highest Scorers</p>
        <div className={s.container__card}>
          {isLoading && (
            <Box className={s.wrap__progress}>
              <CircularProgress />
            </Box>
          )}
          {leaders?.length ? (
            leaders.map(leader => <CardLeaderTop leader={leader} key={leader.id} />)
          ) : (
            <h2>No leader</h2>
          )}
        </div>
        <img className={s.bg__img} src="images/people/business-people.svg" alt="Business people" />
      </div>
      <h1 className={s.title}>LeaderBoard:</h1>
    </>
  );
};

export default Header;

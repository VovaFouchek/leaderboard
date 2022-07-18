import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getImagePath } from 'helpers/functions';
import { getLeaderByID } from 'shared/api/requests/leaders';
import { pathRouters } from 'utility/pathRouters';
import s from './leaderProfile.module.scss';

const leaderDefaultValue = { name: '', score: '0', picture: 'default__avatar' };

const LeaderProfile = () => {
  const { id } = useParams();
  const routers = pathRouters();
  const [leaderInfo, setLeaderInfo] = useState(leaderDefaultValue);

  const getDataLeaderProfile = async leaderID => {
    const leader = await getLeaderByID(leaderID);
    setLeaderInfo(leader);
  };

  useEffect(() => {
    getDataLeaderProfile(id);
  }, []);

  return (
    <div className={s.inner}>
      <button type="button" onClick={() => routers.setPathBack()}>
        Back
      </button>
      <section className={s.wrapper}>
        <img src={getImagePath(leaderInfo.picture)} aria-hidden="true" alt="avatar" />
        <div className={s.container}>
          <h2 className={s.title}>Detail Information:</h2>
          <p>
            Name:<strong> {leaderInfo.name}</strong>
          </p>
          <p>
            Score:
            <strong> {leaderInfo.score}</strong>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LeaderProfile;

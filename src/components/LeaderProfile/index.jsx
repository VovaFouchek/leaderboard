import React from 'react';
import { useParams } from 'react-router-dom';
import { pathRouters } from '../../utility/pathRouters';
import { storageService } from '../../utility/storageService';
import s from './leaderProfile.module.scss';

export const LeaderProfile = ({ list = {} }) => {
  const { id } = useParams();
  const storage = storageService();
  const routers = pathRouters();
  const detailLeader = list.find(item => item.id === id);

  if (detailLeader) {
    storage.setData('detailLeader', detailLeader);
  }
  const detailLeaderData = storage.getData('detailLeader');

  return (
    <>
      <button type="button" onClick={() => routers.setPathBack()}>
        Back
      </button>
      <section className={s.wrapper}>
        <img src={detailLeaderData.picture} aria-hidden="true" alt="avatar" />
        <div className={s.container}>
          <h2 className={s.title}>Detail Information:</h2>
          <p>
            Posititon:
            <strong> {detailLeaderData.position}</strong>
          </p>
          <p>
            Name:<strong> {detailLeaderData.name}</strong>
          </p>
          <p>
            Score:
            <strong> {detailLeaderData.score}</strong>
          </p>
        </div>
      </section>
    </>
  );
};

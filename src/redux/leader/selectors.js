import { getLeaderTop } from 'helpers/functions';

export const getLeaderboardList = state => state.leaderboard;
export const getLeaderboardTop = state => getLeaderTop(state.leaderboard.leaderboardList);

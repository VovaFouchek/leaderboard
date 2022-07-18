import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editLeader } from 'redux/leader/reducer';
import PropTypes from 'prop-types';

import { Input, InputLabel, Button } from '@mui/material';
import { updateLeader } from 'shared/api/requests/leaders';
import { setLeadersOfCurrentDay } from 'redux/history/reducer';

const leaderDefaultValue = { name: '', score: 0, position: 0, id: '', picture: '' };

const EditForm = ({ leader = leaderDefaultValue, handleClose }) => {
  const [values, setValues] = useState(leader);
  const dispatch = useDispatch();
  const { leaders, sortType } = useSelector(state => state.leader);
  const { historyItems, day } = useSelector(state => state.history);

  const editLeaderInList = leaderData => dispatch(editLeader(leaderData, sortType));

  useEffect(() => {
    dispatch(setLeadersOfCurrentDay(leaders));
  }, [leaders]);

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const leaderResponse = await updateLeader(values, historyItems, day);
    if (leaderResponse) {
      editLeaderInList({
        ...leaderResponse,
      });
    }
    handleClose();
  };

  return (
    <form onSubmit={e => onSubmit(e)}>
      <InputLabel htmlFor="user-name">Edit user name:</InputLabel>
      <Input
        onChange={e => handleChange(e)}
        defaultValue={leader.name}
        name="name"
        id="user-name"
        aria-describedby="my-helper-text"
        sx={{ mb: '30px' }}
        required
      />
      <InputLabel htmlFor="user-score">Edit user score:</InputLabel>
      <Input
        onChange={e => handleChange(e)}
        defaultValue={leader.score}
        name="score"
        type="number"
        id="user-score"
        aria-describedby="my-helper-text"
        required
      />
      <Button type="submit" variant="contained" color="success" sx={{ mt: '20px' }}>
        Success
      </Button>
    </form>
  );
};

EditForm.propTypes = {
  leader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }),
  handleClose: PropTypes.func.isRequired,
};

export default EditForm;

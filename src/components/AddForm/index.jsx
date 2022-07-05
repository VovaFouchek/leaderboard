import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Input, InputLabel, Button } from '@mui/material';
import { createLeader } from 'shared/api/requests/leaders';
import { addLeader } from 'redux/leader/reducer';
import { setLeadersOfCurrentDay } from 'redux/history/reducer';

const AddForm = ({ handleClose }) => {
  const [values, setValues] = useState({ name: '', score: 0 });
  const dispatch = useDispatch();
  const { leaders, sortType } = useSelector(state => state.leader);
  const addLeaderInList = leaderData => dispatch(addLeader(leaderData, sortType));

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
    const leaderResponse = await createLeader(values);
    if (leaderResponse) {
      addLeaderInList({
        ...leaderResponse,
        score: +leaderResponse.score,
        id: leaderResponse.id,
      });
    }
    handleClose();
  };

  return (
    <form onSubmit={e => onSubmit(e)}>
      <InputLabel htmlFor="user-name">Add user name:</InputLabel>
      <Input
        onChange={e => handleChange(e)}
        defaultValue={values.name}
        name="name"
        id="user-name"
        aria-describedby="my-helper-text"
        sx={{ mb: '30px' }}
        required
      />
      <InputLabel htmlFor="user-score">Add user score:</InputLabel>
      <Input
        onChange={e => handleChange(e)}
        defaultValue={values.score}
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

AddForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default AddForm;

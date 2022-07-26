import { useEffect } from 'react';

import { Input, InputLabel, Button } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { setLeadersOfCurrentDay } from 'redux/history/reducer';
import { addLeader } from 'redux/leader/reducer';
import { getLeaderboardList } from 'redux/leader/selectors';
import { createLeader } from 'shared/api/requests/leaders';

const AddForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { leaderboardList, sortType } = useSelector(getLeaderboardList);

  const addLeaderInList = leaderData => dispatch(addLeader(leaderData, sortType));

  const initialValues = {
    name: '',
    score: 0,
  };

  const onSubmit = async values => {
    const leaderResponse = await createLeader(values);
    const leaderInList = {
      ...leaderResponse,
      score: +leaderResponse.score,
      id: leaderResponse.id,
    };
    if (leaderResponse) {
      addLeaderInList(leaderInList);
    }
    handleClose();
  };

  useEffect(() => {
    dispatch(setLeadersOfCurrentDay(leaderboardList));
  }, [leaderboardList]);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {props => (
        <Form>
          <InputLabel htmlFor="name">Add user name:</InputLabel>
          <Field
            component={Input}
            onChange={props.handleChange}
            value={props.values.name}
            name="name"
            id="name"
            aria-describedby="my-helper-text"
            sx={{ mb: '30px' }}
            required
          />
          <InputLabel htmlFor="score">Add user score:</InputLabel>
          <Field
            component={Input}
            onChange={props.handleChange}
            value={props.values.score}
            name="score"
            id="score"
            type="number"
            aria-describedby="my-helper-text"
            required
          />
          <Button type="submit" variant="contained" color="success" sx={{ mt: '20px' }}>
            Success
          </Button>
        </Form>
      )}
    </Formik>
  );
};

AddForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default AddForm;

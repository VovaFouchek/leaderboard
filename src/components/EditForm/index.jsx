import { useEffect } from 'react';

import { Button, Input, InputLabel } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { leaderDefaultValue } from 'helpers/consts';
import { setLeadersOfCurrentDay } from 'redux/history/reducer';
import { editLeader } from 'redux/leader/reducer';
import { getLeaderboardList } from 'redux/leader/selectors';
import { updateLeader } from 'shared/api/requests/leaders';

const EditForm = ({ leader = leaderDefaultValue, handleClose }) => {
  const dispatch = useDispatch();
  const { leaderboardList, sortType } = useSelector(getLeaderboardList);

  const editLeaderInList = leaderData => dispatch(editLeader(leaderData, sortType));

  const initialValues = {
    name: leader.name,
    score: leader.score,
  };

  const onSubmit = async values => {
    const updateLeaderData = { ...values, id: leader.id };
    const leaderResponse = await updateLeader(updateLeaderData);
    if (leaderResponse) {
      editLeaderInList({ ...leaderResponse });
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
          <InputLabel htmlFor="name">Edit user name:</InputLabel>
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
          <InputLabel htmlFor="score">Edit user score:</InputLabel>
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

EditForm.propTypes = {
  leader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }),
  handleClose: PropTypes.func.isRequired,
};

export default EditForm;

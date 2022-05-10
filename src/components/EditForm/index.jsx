import React, { useState } from 'react';
import { Input, InputLabel, Button } from '@mui/material';

export const EditForm = ({ leader, handleClose, editList }) => {
  const [values, setValues] = useState(leader);

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    editList(values);
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

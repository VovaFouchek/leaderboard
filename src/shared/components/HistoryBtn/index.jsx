import { Button } from '@mui/material';
import PropTypes from 'prop-types';

import { btnColors } from 'helpers/consts';

const HistoryBtn = ({ onClick, extraColor, extraColorHover, disabled, children }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        display: 'inline-block',
        padding: '0',
        marginBottom: '10px',
        maxWidth: '180px',
        textTransform: 'inherit',
        backgroundColor: extraColor || btnColors.mainColor,
        '&:hover': {
          backgroundColor: extraColorHover || btnColors.mainColorHover,
        },
      }}
    >
      {children}
    </Button>
  );
};

export default HistoryBtn;

HistoryBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  extraColor: PropTypes.string,
  extraColorHover: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

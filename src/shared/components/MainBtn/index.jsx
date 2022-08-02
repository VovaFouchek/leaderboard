import { Button } from '@mui/material';
import PropTypes from 'prop-types';

import { btnColors } from 'helpers/consts';

const MainBtn = ({ onClick, extraColor, extraColorHover, disabled, option, children }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        maxWidth: '140px',
        backgroundColor: extraColor || btnColors.mainColor,
        fontSize: '13px',
        textTransform: 'inherit',
        display: option,
        '&:hover': {
          backgroundColor: extraColorHover || btnColors.mainColorHover,
        },
      }}
    >
      {children}
    </Button>
  );
};

export default MainBtn;

MainBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  extraColor: PropTypes.string,
  extraColorHover: PropTypes.string,
  disabled: PropTypes.bool,
  option: PropTypes.string,
  children: PropTypes.node.isRequired,
};

import PropTypes from 'prop-types';

import s from './wrapper.module.scss';

export const Wrapper = ({ children }) => {
  return <div className={s.wrapper__content}>{children}</div>;
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

import PropTypes from 'prop-types';
import s from './wrapper.module.scss';

export const Wrapper = ({ children }) => {
  return <div className={s.inner}>{children}</div>;
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

import styles from './index.module.css';
import cx from 'classnames';

export const Button = ({className, ...props}) => (
  <button {...props} className={cx(styles.button, className)} />
);

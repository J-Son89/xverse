import cx from 'classnames';
import styles from './index.module.css';

export const Label = ({children, size}) => (
  <span
    className={cx(styles.labelContainer, {
      [styles.large]: size === 'large',
      [styles.small]: size === 'small',
    })}
  >
    {children}
  </span>
);

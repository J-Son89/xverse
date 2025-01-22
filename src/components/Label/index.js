import styles from './index.module.css';

export const Label = ({ children }) => (
  <span className={styles.labelContainer}>
    {children}
  </span>
);

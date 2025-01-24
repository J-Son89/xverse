import styles from './index.module.css';
import cx from 'classnames';

export const Input = ({ onChange, placeholder="insert Address", value, label, type = "text", className,  readOnly }) => (
  <div className={styles.inputContainer}>
    <input
      onChange={onChange}
      value={value}
      type={type}
      readOnly={readOnly}
      placeholder={placeholder}
      className={cx(className, styles.input)}
    ></input>
  </div>
);

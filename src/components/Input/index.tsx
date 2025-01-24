import React from 'react';
import styles from './index.module.css';
import cx from 'classnames';

type InputType = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string;
  className?: string;
  readOnly?: boolean;
  type?: 'text' | 'password';
};

export const Input: React.FC<InputType> = ({
  onChange,
  placeholder = 'insert Address',
  value,
  type = 'text',
  className,
  readOnly,
}) => (
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

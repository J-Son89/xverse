import React from 'react';
import styles from './index.module.css';
import cx from 'classnames';

type InputLabelType = {
  children?: string;
  className?: string;
};

export const InputLabel: React.FC<InputLabelType> = ({children, className}) => (
  <div className={cx(className, styles.inputContainer)}>{children}</div>
);

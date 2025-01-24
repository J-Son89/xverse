import React from 'react';
import styles from './index.module.css';
import cx from 'classnames';

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: String;
  backButton?: boolean;
};

export const Button: React.FC<ButtonType> = ({className, ...props}) => (
  <button {...props} className={cx(styles.button, className)} />
);

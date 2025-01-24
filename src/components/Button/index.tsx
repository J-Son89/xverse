import React from 'react';
import styles from './index.module.css';
import cx from 'classnames';

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: String;
  backButton?: boolean;
  buttonType?: 'primary' | 'secondary';
  disabled?: boolean;
};

export const Button: React.FC<ButtonType> = ({ className, disabled, buttonType = 'primary', ...props }) => (
  <button {...props} className={cx(styles.button, className,
    {
      [styles.secondary]: buttonType === 'secondary',
      [styles.disabled]: disabled
    }
  )} />
);

import React from 'react';
import cx from 'classnames';
import styles from './index.module.css';

type LabelType = {
  children: String;
  size?: 'small' | 'large';
};

export const Label: React.FC<LabelType>  = ({children, size}) => (
  <span
    className={cx(styles.labelContainer, {
      [styles.large]: size === 'large',
      [styles.small]: size === 'small',
    })}
  >
    {children}
  </span>
);

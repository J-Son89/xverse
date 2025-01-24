import React from 'react';
import styles from './index.module.css';
import {Label} from '../Label';

type ListItemType = {
  title: String;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export const ListItem: React.FC<ListItemType> = ({title, onClick}) => {
  return (
    <div
      className={styles.listItem}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <Label>{title}</Label>
      <span className={styles.arrow}>&gt;</span>
    </div>
  );
};

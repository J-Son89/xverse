import React from 'react';
import styles from './index.module.css';
import {Label} from '../Label';
import {useNavigate} from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleGoBack} className={styles.backButton}>
      <span className={styles.arrow}>&lt;</span>
    </button>
  );
};

type HeaderType = {
  title: String;
  backButton?: boolean;
};

export const Header: React.FC<HeaderType> = ({title, backButton}) => {
  return (
    <div className={styles.headerContainer}>
      {backButton && <BackButton />}
      <Label>{title}</Label>
    </div>
  );
};

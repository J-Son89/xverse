import styles from "./index.module.css";
import cx from "classnames";
import { Label } from "../Label";
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <button onClick={handleGoBack} className={styles.backButton}>
      <span className={styles.arrow}>&larr;</span>
    </button>
  );
};


export const Header = ({ title, backButton }) => {
    return (
        <div className={styles.headerContainer}>
            {backButton && <BackButton/> }
            <Label>{title}</Label>
        </div>
    );
};

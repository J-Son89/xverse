import styles from './index.module.css'
import cx from "classnames";
import { Label } from '../Label';

export const ListItem = ({ title, onClick }) => {
    return (
        <div className={styles.listItem} onClick={onClick} role="button" tabIndex={0}>
            <Label >{title}</Label>
            <span className={styles.arrow}>&gt;</span>
        </div>
    );
};

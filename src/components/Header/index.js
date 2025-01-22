import styles from "./index.module.css";
import cx from "classnames";
import { Label } from "../Label";

export const Header = ({ title }) => {
    return (
        <div className={styles.headerContainer}>
            <Label>{title}</Label>
        </div>
    );
};

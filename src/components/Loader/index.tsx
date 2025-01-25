import React from 'react';
import { ClipLoader } from 'react-spinners';
import styles from './index.module.css';

interface LoaderProps {
    loading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className={styles.loader}>
            <ClipLoader color="#5A5AFF" size={50} />
        </div>
    );
};

export default Loader;

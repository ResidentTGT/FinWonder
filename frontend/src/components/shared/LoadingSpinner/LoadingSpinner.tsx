import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './LoadingSpinner.module.scss';

export const LoadingSpinnerComponent = (props: {
    size?: number;
}): JSX.Element => {
    const [spinSize] = useState(props.size || 60);

    return (
        <div className={styles.layout}>
            <CircularProgress className={styles.spinner} size={spinSize} />
        </div>
    );
};

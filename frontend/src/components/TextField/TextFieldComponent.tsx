import { TextField } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { FieldState } from '../../models/field-state.model';
import styles from './TextFieldComponent.module.scss';

export type TextFieldProps = {
    label: string;
    entity: FieldState;
    changeFunc: Function;
    type: string;
};

export const TextFieldComponent: FunctionComponent<TextFieldProps> = ({
    label,
    entity,
    changeFunc,
    type,
}) => (
    <aside>
        <TextField
            required
            className={styles.textField}
            label={label}
            type={type}
            variant="outlined"
            value={entity.value}
            error={!!entity.error}
            helperText={entity.error}
            onChange={(event): void => changeFunc(event.target.value)}
        />
    </aside>
);

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styles from './BalanceDialog.module.scss';
import { Balance } from '../../models/balance.model';
import isNullOrWhitespace from '../../helpers/isNullOrWhitespace';

export interface BalanceDialogPropsInterface {
    open: boolean;
    handleClose?: any;
    balance?: Balance;
}

export const BalanceDialogComponent = ({
    open,
    handleClose,
    balance,
}: BalanceDialogPropsInterface): JSX.Element => {
    const [name, setName] = useState<string>('');
    const [, setDescription] = useState<string>('');
    const [error, setError] = useState<string>();

    useEffect(() => {
        setName(balance?.name ?? '');
        setDescription(balance?.description ?? '');
    }, [balance]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{balance?.id ? 'Редактирование' : 'Создание'}</DialogTitle>
            <DialogContent className={styles.content}>
                <TextField
                    required
                    className={styles.name}
                    label="Название"
                    type="text"
                    value={name}
                    autoFocus
                    error={!!error}
                    fullWidth
                    helperText={error}
                    onChange={(event): void => {
                        const newValue = event.target.value;
                        setName(newValue);
                        setError(isNullOrWhitespace(newValue) ? 'Обязательное поле' : '');
                    }}
                />
            </DialogContent>
            <DialogActions className={styles.actions}>
                <Button onClick={handleClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleClose} color="primary" variant="contained">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

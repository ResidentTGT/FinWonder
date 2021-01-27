/* eslint-disable no-debugger */
import {
    TableRow,
    TableCell,
    Table,
    TableHead,
    TableBody,
    Paper,
    TableContainer,
    Button,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { tap } from 'rxjs/internal/operators/tap';
import { Balance } from '../../models/balance.model';
import balancesService from '../../services/balances.service';
import {
    BalanceDialogComponent,
    BalanceDialogPropsInterface,
} from '../BalanceDialog/BalanceDialog';
import { LoadingSpinnerComponent } from '../shared/LoadingSpinner/LoadingSpinner';
import { TableRowComponent } from '../TableRow/TableRow';
import styles from './Balances.module.scss';

export const BalancesComponent = (): JSX.Element => {
    const [balances, setBalances] = useState<Balance[]>([]);
    const [loading, setLoading] = useState(false);
    const [dialogParams, setDialogParams] = useState<BalanceDialogPropsInterface>();

    const handleModalAction = (reload?: boolean): void => {
        if (reload) {
            setLoading(true);

            balancesService
                .get()
                .pipe(
                    tap((balances) => {
                        setBalances(balances);
                    })
                )
                .subscribe({
                    complete: () => {
                        setLoading(false);
                    },
                });
        }

        setDialogParams(undefined);
    };

    const handleClickOpen = (balance?: Balance) => {
        setDialogParams({
            open: true,
            handleClose: (reload?: boolean) => handleModalAction(reload),
            balance: balance ?? new Balance(),
        });
    };

    useEffect(() => {
        setLoading(true);

        const subscription = balancesService
            .get()
            .pipe(
                tap((balances) => {
                    setBalances(balances);
                })
            )
            .subscribe({
                complete: () => {
                    setLoading(false);
                },
            });

        return (): void => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, []);

    return (
        <>
            {dialogParams && (
                <BalanceDialogComponent
                    balance={dialogParams.balance}
                    open={dialogParams.open}
                    handleClose={dialogParams.handleClose}
                ></BalanceDialogComponent>
            )}

            <div className={styles.layout}>
                <div className={styles.actions}>
                    <span className={styles.title}>Таблица балансов</span>
                    <Button
                        variant="contained"
                        color="primary"
                        className={styles.create}
                        onClick={() => handleClickOpen()}
                    >
                        Создать новый
                    </Button>
                </div>
                <div className={styles.tableLayout}>
                    {loading && <LoadingSpinnerComponent />}
                    <TableContainer className={styles.table} component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Название</TableCell>
                                    <TableCell>Описание</TableCell>
                                    <TableCell>Дата создания</TableCell>
                                    <TableCell>Активен</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {balances.map((b) => (
                                    <TableRowComponent
                                        key={b.id}
                                        balance={b}
                                        onEditClick={() => handleClickOpen(b)}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
};

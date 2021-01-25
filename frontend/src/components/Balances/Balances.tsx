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
import { BalanceDialogComponent } from '../BalanceDialog/BalanceDialog';
import { LoadingSpinnerComponent } from '../shared/LoadingSpinner/LoadingSpinner';
import { TableRowComponent } from '../TableRow/TableRow';
import styles from './Balances.module.scss';

export const BalancesComponent = (): JSX.Element => {
    const [balances, setBalances] = useState<Balance[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
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
        <div className={styles.layout}>
            <div className={styles.actions}>
                <span className={styles.title}>Таблица балансов</span>
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.create}
                    onClick={handleClickOpen}
                >
                    Создать новый
                </Button>
                <BalanceDialogComponent
                    open={openDialog}
                    handleClose={handleClose}
                ></BalanceDialogComponent>
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
                                <TableRowComponent key={b.id} balance={b} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

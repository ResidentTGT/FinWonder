import {
    TableRow,
    TableCell,
    Checkbox,
    IconButton,
    createStyles,
    withStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { Balance } from '../../models/balance.model';

const StyledTableCell = withStyles(() =>
    createStyles({
        body: {
            padding: '5px 16px',
        },
    })
)(TableCell);

export const TableRowComponent = (props: { balance: Balance }): JSX.Element => {
    const { balance } = props;
    const [checked, setChecked] = useState(balance.isActive);

    const handleChange = (): void => {
        setChecked(!checked);
    };

    return (
        <>
            <TableRow>
                <StyledTableCell>{balance.name}</StyledTableCell>
                <StyledTableCell>{balance.description}</StyledTableCell>
                <StyledTableCell>
                    {balance.creationDate?.toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                    />
                </StyledTableCell>
                <StyledTableCell>
                    <IconButton color="primary">
                        <EditIcon />
                    </IconButton>
                </StyledTableCell>
            </TableRow>
        </>
    );
};

import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { NavLink } from 'react-router-dom';

import InboxIcon from '@material-ui/icons/Inbox';
import styles from './Aside.module.scss';

export const AsideComponent = (): JSX.Element => {
    return (
        <div className={styles.layout}>
            <List>
                <ListItem button component={NavLink} to="balances" activeClassName={styles.active}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Балансы" />
                </ListItem>
            </List>
        </div>
    );
};

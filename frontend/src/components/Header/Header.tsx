import { Button, IconButton, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ExitToApp from '@material-ui/icons/ExitToApp';

import styles from './Header.module.scss';
import userService from '../../services/user.service';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from '../../models/user.model';
import localStorageService, {
    LocalStorageEntities,
} from '../../services/local-storage.service';

export const Header = (): JSX.Element => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const subscription = userService
            .getUserObservable()
            .pipe(tap((u) => setUser(u)))
            .subscribe();

        return (): void => {
            subscription.unsubscribe();
        };
    }, []);

    const logout = (): void => {
        localStorageService.deleteSettings(LocalStorageEntities.Token);
        window.location.reload();
    };

    return (
        <AppBar position="static" className={styles.appBar}>
            <Toolbar className={styles.toolbar}>
                <Typography className={styles.title} variant="h6" noWrap>
                    FinWonder
                </Typography>
                <div className={styles.user}>
                    {user?.email ? (
                        <>
                            <div className={styles.name}>{user.name}</div>
                            <IconButton color="inherit" onClick={logout}>
                                <ExitToApp />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="register"
                                className={styles.link}
                                activeClassName={styles.active}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                >
                                    Регистрация
                                </Button>
                            </NavLink>
                            <NavLink
                                to="login"
                                className={styles.link}
                                activeClassName={styles.active}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                >
                                    Вход
                                </Button>
                            </NavLink>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

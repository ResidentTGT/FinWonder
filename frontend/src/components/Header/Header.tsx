import { Button, IconButton, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import ExitToApp from "@material-ui/icons/ExitToApp";

import styles from "./Header.module.scss";
import userService from "../../services/user.service";
import { tap } from "rxjs/internal/operators/tap";
import { User } from "../../models/user.model";
import localStorageService, {
    LocalStorageEntities,
} from "../../services/local-storage.service";

function Header() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const subscription = userService
            .getUserObservable()
            .pipe(tap((u) => setUser(u)))
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const logout = () => {
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
                    {!!user?.email ? (
                        <>
                            <div className={styles.name}>{user.name}</div>
                            <IconButton color="inherit" onClick={logout}>
                                <ExitToApp />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Link to="register" className={styles.link}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                >
                                    Регистрация
                                </Button>
                            </Link>
                            <Link to="login" className={styles.link}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                >
                                    Вход
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;

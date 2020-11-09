import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router";
import Header from "../Header/Header";
import styles from "./App.module.scss";
import Login from "../Login/Login";
import RegisterComponent from "../Register/Register";
import { MainPageComponent } from "../MainPage/MainPage";
import { LocalStorageEntities } from "../../services/local-storage.service";
import userService from "../../services/user.service";
import { tap } from "rxjs/internal/operators/tap";

import InboxIcon from "@material-ui/icons/Inbox";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem(LocalStorageEntities.Token);

        let subscription: any = null;
        if (token) {
            subscription = userService
                .getUser()
                .pipe(tap((u) => userService.setUser(u)))
                .subscribe(null, null, () => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, []);

    return (
        <div className={styles.appLayout}>
            {loading ? (
                <div></div>
            ) : (
                <>
                    <header className={styles.header}>
                        <Header />
                    </header>

                    <div className={styles.mainLayout}>
                        <aside className={styles.aside}>
                            <List>
                                <ListItem
                                    button
                                    component={NavLink}
                                    to="balances"
                                    activeClassName={styles.active}
                                >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Балансы" />
                                </ListItem>
                            </List>
                        </aside>
                        <main className={styles.main}>
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    component={MainPageComponent}
                                />
                                <Route
                                    exact
                                    path="/register"
                                    component={RegisterComponent}
                                />
                                <Route exact path="/login" component={Login} />
                            </Switch>
                        </main>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;

import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router';
import { Header } from '../Header/Header';
import styles from './App.module.scss';
import { LoginComponent } from '../Login/Login';
import { RegisterComponent } from '../Register/Register';
import { MainPageComponent } from '../MainPage/MainPage';
import { LocalStorageEntities } from '../../services/local-storage.service';
import userService from '../../services/user.service';
import { tap } from 'rxjs/internal/operators/tap';
import { AsideComponent } from '../Aside/Aside';
import { BalancesComponent } from '../Balances/Balances';
import { Subscription } from 'rxjs';

export const App = (): JSX.Element => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem(LocalStorageEntities.Token);

        let subscription: Subscription;
        if (token) {
            subscription = userService
                .getUser()
                .pipe(tap((u) => userService.setUser(u)))
                .subscribe({
                    complete: () => {
                        setLoading(false);
                    },
                });
        } else {
            setLoading(false);
        }

        return (): void => {
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
                            <AsideComponent />
                        </aside>
                        <main className={styles.main}>
                            <Switch>
                                <Route exact path="/" component={MainPageComponent} />
                                <Route exact path="/register" component={RegisterComponent} />
                                <Route exact path="/balances" component={BalancesComponent} />
                                <Route exact path="/login" component={LoginComponent} />
                            </Switch>
                        </main>
                    </div>
                </>
            )}
        </div>
    );
};

import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Header from "../Header/Header";
import styles from "./App.module.scss";
import Login from "../Login/Login";
import RegisterComponent from "../Register/Register";

function App() {
    return (
        <div className={styles.appLayout}>
            <header className={styles.header}>
                <Header />
            </header>
            <main className={styles.main}>
                <Switch>
                    <Route path="/register" component={RegisterComponent} />
                    <Route path="/login" component={Login} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </main>
        </div>
    );
}

export default App;

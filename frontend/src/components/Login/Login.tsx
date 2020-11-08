import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EMPTY } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { isValidEmail } from "../../helpers/validateEmail";
import { FieldState } from "../../models/field-state.model";
import userService from "../../services/user.service";
import { TextFieldComponent } from "../TextField/TextFieldComponent";
import { useHistory } from "react-router-dom";

import styles from "./Login.module.scss";

function LoginComponent() {
    const [password, setPassword] = useState(new FieldState());
    const [email, setEmail] = useState(new FieldState());
    const [error, setError] = useState("");

    const history = useHistory();

    const isValidForm = (): boolean => !!(password.value && email.value);

    useEffect(() => {
        const subscription = userService
            .getUser()
            .pipe(
                tap((user) => {
                    if (user) {
                        history.push("/");
                    }
                })
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const login = () => {
        userService
            .login(email.value, password.value)
            .pipe(
                tap(() => history.push("/")),
                catchError((e) => {
                    if (e.status === 401) {
                        setError("Введен неверный логин или пароль.");
                    }
                    return EMPTY;
                })
            )
            .subscribe();
    };

    const setValue = (stateName: string, value: string) => {
        let func: Function = () => null;
        let error = "";

        switch (stateName) {
            case "password":
                func = setPassword;
                break;
            case "email":
                func = setEmail;
                break;
        }

        func(new FieldState(value, error));
    };

    const fields: { label: string; stateName: string; entity: FieldState }[] = [
        {
            label: "Email",
            stateName: "email",
            entity: email,
        },
        {
            label: "Пароль",
            stateName: "password",
            entity: password,
        },
    ];

    return (
        <div className={styles.layout}>
            <form className={styles.form} autoComplete="off">
                {fields.map((f) => (
                    <div className={styles.field} key={f.stateName}>
                        <TextFieldComponent
                            label={f.label}
                            entity={f.entity}
                            type={
                                f.stateName === "password" ? "password" : "text"
                            }
                            changeFunc={(value: string) =>
                                setValue(f.stateName, value)
                            }
                        />
                    </div>
                ))}

                <div className={styles.error}>{error}</div>

                <div className={styles.actions}>
                    <Link to="register" className={styles.link}>
                        <Button variant="outlined" color="primary">
                            Регистрация
                        </Button>
                    </Link>

                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!isValidForm()}
                        onClick={login}
                    >
                        Войти
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;

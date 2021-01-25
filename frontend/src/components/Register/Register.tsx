import React, { useEffect, useState } from 'react';

import styles from './Register.module.scss';
import Button from '@material-ui/core/Button/Button';
import { Link } from 'react-router-dom';
import { FieldState } from '../../models/field-state.model';
import { TextFieldComponent } from '../TextField/TextFieldComponent';
import { isValidEmail } from '../../helpers/validateEmail';
import userService from '../../services/user.service';
import { tap } from 'rxjs/internal/operators/tap';
import { useHistory } from 'react-router-dom';
import { catchError } from 'rxjs/internal/operators/catchError';
import { EMPTY, Observable } from 'rxjs';

export const RegisterComponent = (): JSX.Element => {
    const [name, setName] = useState(new FieldState());
    const [password, setPassword] = useState(new FieldState());
    const [email, setEmail] = useState(new FieldState());
    const [error, setError] = useState('');

    const history = useHistory();

    useEffect(() => {
        const subscription = userService
            .getUser()
            .pipe(
                tap((user) => {
                    if (user) {
                        history.push('/');
                    }
                })
            )
            .subscribe();

        return (): void => {
            subscription.unsubscribe();
        };
    }, [history]);

    const isValidForm = (): boolean =>
        !!(
            name.value &&
            password.value &&
            email.value &&
            !name.error &&
            !email.error &&
            !password.error
        );

    const register = (): void => {
        userService
            .register(name.value, password.value, email.value)
            .pipe(
                tap((user) => {
                    userService.setUser(user);
                    history.push('/');
                }),
                catchError(
                    (e): Observable<never> => {
                        setError('Ошибка регистрации!');
                        return EMPTY;
                    }
                )
            )
            .subscribe();
    };

    const setValue = (stateName: string, value: string): void => {
        let func: React.Dispatch<React.SetStateAction<FieldState>> = () => null;
        let error = '';

        switch (stateName) {
            case 'name':
                func = setName;
                error = value ? '' : 'Обязательное поле';
                break;
            case 'password':
                func = setPassword;
                if (!value) {
                    error = 'Обязательное поле';
                    break;
                }
                if (value.length < 8) {
                    error = 'Пароль должен содержать не менее 8 символов';
                    break;
                }
                if (!/([0-9].*[a-z])|([a-z].*[0-9])/.test(value)) {
                    error =
                        'Пароль должен содержать хотя бы одну букву и цифру';
                    break;
                }
                break;
            case 'email':
                func = setEmail;
                if (!value) {
                    error = 'Обязательное поле';
                    break;
                }
                if (!isValidEmail(value)) {
                    error = 'Email имеет неправильный формат';
                    break;
                }

                error = '';
                break;
        }

        func(new FieldState(value, error));
    };

    const fields: { label: string; stateName: string; entity: FieldState }[] = [
        {
            label: 'Имя',
            stateName: 'name',
            entity: name,
        },
        {
            label: 'Email',
            stateName: 'email',
            entity: email,
        },
        {
            label: 'Пароль',
            stateName: 'password',
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
                                f.stateName === 'password' ? 'password' : 'text'
                            }
                            changeFunc={(value: string): void =>
                                setValue(f.stateName, value)
                            }
                        />
                    </div>
                ))}

                <div className={styles.error}>{error}</div>

                <div className={styles.actions}>
                    <Link to="login" className={styles.link}>
                        <Button variant="outlined" color="primary">
                            Войти
                        </Button>
                    </Link>

                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!isValidForm()}
                        onClick={register}
                    >
                        Регистрация
                    </Button>
                </div>
            </form>
        </div>
    );
};

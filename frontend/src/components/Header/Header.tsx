import classes from "*.module.css";
import { Button, IconButton, InputBase, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import React from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";

import styles from "./Header.module.scss";

function Header() {
    return (
        <AppBar position="static" className={styles.appBar}>
            <Toolbar className={styles.toolbar}>
                <Typography className={styles.title} variant="h6" noWrap>
                    FinWonder
                </Typography>
                <div className={styles.user}>
                    <Link to="register" className={styles.link}>
                        <IconButton color="inherit">
                            <PersonIcon />
                        </IconButton>
                    </Link>
                    <Link to="login" className={styles.link}>
                        <IconButton color="inherit">
                            <PersonIcon />
                        </IconButton>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;

import { TextField } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { FieldState } from "../../models/field-state.model";
import styles from "./TextFieldComponent.module.scss";

export type TextFieldProps = {
    label: string;
    entity: FieldState;
    changeFunc: any;
};

export const TextFieldComponent: FunctionComponent<TextFieldProps> = ({
    label,
    entity,
    changeFunc,
}) => (
    <aside>
        <TextField
            required
            className={styles.textField}
            label={label}
            variant="outlined"
            value={entity.value}
            error={!!entity.error}
            helperText={entity.error}
            onChange={(event) => changeFunc(event.target.value)}
        />
    </aside>
);

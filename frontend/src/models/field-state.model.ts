export class FieldState {
    value: string;
    error: string;

    constructor(value: string = "", error: string = "") {
        this.value = value;
        this.error = error;
    }
}

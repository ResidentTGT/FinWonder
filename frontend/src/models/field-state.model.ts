export class FieldState {
    value: string;
    error: string;

    constructor(value = '', error = '') {
        this.value = value;
        this.error = error;
    }
}

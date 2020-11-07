export function isValidEmail(value: string): boolean {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(value);
}

export default function isNullOrWhitespace(value: string): boolean {
    return !value || !value.trim();
}

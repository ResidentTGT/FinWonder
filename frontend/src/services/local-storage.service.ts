export enum LocalStorageEntities {
    Token = 'token',
}

export class LocalStorageService {
    public getSettings = (key: LocalStorageEntities): string | null =>
        localStorage.getItem(key);

    public setSettings(
        key: LocalStorageEntities,
        object: Record<string, unknown> | string
    ): void {
        if (!key) {
            throw new Error('There is no key for setting in local storage.');
        }

        localStorage.setItem(key, JSON.stringify(object));
    }

    public deleteSettings(key: LocalStorageEntities): void {
        localStorage.removeItem(key);
    }
}

const localStorageService = new LocalStorageService();
export default localStorageService;

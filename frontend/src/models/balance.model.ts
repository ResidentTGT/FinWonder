export class Balance {
    public id?: string;
    public name?: string;
    public description?: string;
    public isActive?: boolean;
    public creationDate?: Date;

    static fromJSON(obj: Balance): Balance {
        return Object.assign(new Balance(), obj, {
            creationDate: obj.creationDate ? new Date(obj.creationDate) : null,
        });
    }
}

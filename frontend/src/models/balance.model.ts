export class Balance {
    public id?: string;
    public name?: string;
    public description?: string;
    public isActive?: boolean;
    public creationDate?: Date;

    constructor(name?: string, description?: string, isActive = true) {
        this.name = name;
        this.description = description;
        this.isActive = isActive;
    }

    static fromJSON(obj: Balance): Balance {
        return Object.assign(new Balance(), obj, {
            creationDate: obj.creationDate ? new Date(obj.creationDate) : null,
        });
    }
}

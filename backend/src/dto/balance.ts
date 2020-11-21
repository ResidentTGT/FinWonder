export class BalanceDto {
    public id?: string;
    public name: string = "";
    public description?: string;
    public isActive: boolean = true;
    public creationDate?: Date;

    static createFrom(obj: any): BalanceDto {
        const balance = new BalanceDto();
        balance.id = obj._id;
        balance.name = obj.name;
        balance.description = obj.description;
        balance.isActive = obj.isActive;
        balance.creationDate = obj.creationDate;
        return balance;
    }
}

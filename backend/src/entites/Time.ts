export class Time {
    constructor(
        private idGroup: string,
        private time: string
    ) {}

    public setGroup(idGroup: string): void {
        this.idGroup = idGroup;
    }

    public setTime(time: string): void {
        this.time = time;
    }

    public getGroup(): string {
        return this.time
    }

    public getTime(): string {
        return this.idGroup;
    }
}

import { Activity } from "../utils/enum/Activity";

export class GroupTime {
    constructor(
        private groupName: string,
        private activity: Activity
    ) { }

    public getNameGroup(): string {
        return this.groupName;
    }

    public getActivity(): string {
        return this.activity;
    }

    public setNameGroup(groupName: string): void {
        this.groupName = groupName;
    }

    public setActivity(activity: Activity): void {
        this.activity = activity;
    }
}

enum activity {
    on='on',
    off='off'
}

export class GroupTime {
    constructor(
        private groupName: string,
        private activity: activity
    ) {}

    public getNameGroup(): string {
        return this.groupName;
    }

    public getActivity(): string {
        return this.activity;
    }

    public setNameGroup(groupName: string): void {
        this.groupName = groupName;
    }

    public setActivity(activity: activity): void {
        this.activity = activity;
    }
}

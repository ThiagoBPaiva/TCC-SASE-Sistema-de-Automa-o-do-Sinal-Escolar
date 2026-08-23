import { activity } from '../utils/enumForGroupTime'

export class GroupTime {
    constructor(
        private id: string,
        private groupName: string,
        private activity: activity
    ) {}
}

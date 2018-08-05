class UserStatsRequestModels {
    constructor(t: StatType) {
        this.Type = t;
    }
    public Type: StatType;
    public Group: string;
}

class UserStatsResponseModels<T> {
    public Count: number;
    public Values: T[];
}

enum StatType {
    Group,
    User,
    UserInGroup
}
class UserSignalR {
    public Username: string;
    public ConnectionId: string;
}
export {UserStatsRequestModels, UserStatsResponseModels, StatType, UserSignalR };

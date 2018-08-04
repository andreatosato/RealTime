class UserStatsRequestModels {
    constructor(t: StatType) {
        this.Type = t;
    }
    public Type: StatType;
    public Group: string;
}

class UserStatsResponseModels {
    public Count: number;
    public Values: string[];
}

enum StatType {
    Group,
    User,
    UserInGroup
}

export {UserStatsRequestModels, UserStatsResponseModels, StatType };

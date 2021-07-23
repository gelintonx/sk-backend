import { User } from "../../../../domain/entities/User";

export class SaveUserInputBoundary {
    
    public user: User;

    constructor(user: User) {
        this.user = user;
    }
}
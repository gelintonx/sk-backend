
export class SaveCacheInputBoundary {

    public username:string;
    public challenge:string;

    constructor(username: string, challenge: string) {
        this.username = username
        this.challenge = challenge
    }
}
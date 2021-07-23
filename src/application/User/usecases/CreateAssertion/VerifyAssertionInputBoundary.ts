
export class VerifyAssertionInputBoundary {

    public registerResponse: any;
    public challenge: string;
    public username: string;

    constructor(registerResponse: any, challenge: string, username: string) {
        this.registerResponse = registerResponse;
        this.challenge = challenge;
        this.username = username;
    }
}
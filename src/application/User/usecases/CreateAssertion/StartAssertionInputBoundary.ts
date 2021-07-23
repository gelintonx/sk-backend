
export class StartAssertionInputBoundary {

    public username: string;
    public authenticators: [];

    constructor(username: string, authenticators: []) {
        this.username = username;
        this.authenticators = authenticators;
    }
}
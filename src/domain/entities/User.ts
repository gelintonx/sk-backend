import {v4 as uuidv4} from 'uuid';
import { Authenticator } from './Authenticator';

export class User {
    private id?: string;
    private username: string;
    private currentChallenge: string;
    private authenticators: Authenticator[];
    

    constructor(username: string,  authenticators?: Authenticator[] ,id?: string,currentChallenge?: string) {
        this.id = id ? id : uuidv4();
        this.username = username;
        this.authenticators = authenticators ? authenticators : [];
        this.currentChallenge = currentChallenge ? currentChallenge : '';
    }


    public _id() {
        return this.id;
    }
    
    public _username() {
        return this.username;
    }

    public _challenge() {
        return this.currentChallenge;
    }

    public _authenticator() {
        return this.authenticators;
    }

    public updateChallenge(newChallengge: string) {
        this.currentChallenge = newChallengge;
    }

    public updateAuthenticator(newAuthenticator: Authenticator) {
        this.authenticators.push(newAuthenticator);
    }

    

    
}
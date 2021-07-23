import { User } from "../../../../domain/entities/User";


export class VerifyAttestationInputBoundary {

        public registerResponse: any;
        public username: string
        public challenge: string

        constructor(registerResponse: any, username: string, challenge: string) {
            this.registerResponse = registerResponse;
            this.username = username;
            this.challenge = challenge;
        }

}
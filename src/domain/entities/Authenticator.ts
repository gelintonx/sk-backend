
export class Authenticator {

    private credentialId: Buffer;
    private credentialPublicKey: Buffer;
    private counter: number;

    
    constructor(credentialId: Buffer, credentialPublicKey: Buffer, counter: number) {
        this.credentialId = credentialId;
        this.credentialPublicKey = credentialPublicKey;
        this.counter = counter;
    }

    public _credentialId() {
        return this.credentialId.toString('base64');
    }

    public _credentialPublicKey() {
        return this.credentialPublicKey.toString('base64');
    }

    public _counter() {
        return this.counter;
    }

    

  
}
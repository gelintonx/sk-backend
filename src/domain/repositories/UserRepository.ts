import {User} from '../entities/User';

export abstract class UserRepository {

    // Exception
    checkIfUserAlreadyExists(username: string) {}

    // Cache
    saveDataInCache(username: string, challenge: string) {}
    getDataFromCache() {}

    // Attestation
    createAttestationOptions(username: string) {}
    verifyChallengeAttestationResponse(credential: {}, user: User) {}
    saveUser(user: User) {}

    // Assertion
    createAssertionOptions(username: string, authenticators: []) {}
    verifyChallengeAssertionResponse(credential: any, challenge: string, authenticator: any) {}
    async getCredentials(username: string) {}

}
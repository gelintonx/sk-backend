import { User } from '../../../../domain/entities/User';
import { Authenticator } from '../../../../domain/entities/Authenticator';
import {UserRepository} from '../../../../domain/repositories/UserRepository';
import { StartAssertionInputBoundary } from './StartAssertionInputBoundary';
import { VerifyAssertionInputBoundary } from './VerifyAssertionInputBoundary';


export class CreateAssertion {

    private repository: UserRepository;
    private dbRepository: UserRepository;

    constructor(repository: UserRepository, dbRepository: UserRepository) {
        this.repository = repository;
        this.dbRepository = dbRepository;
    }

    start (startAssertion: StartAssertionInputBoundary) {
        
        const options: any = this.repository.createAssertionOptions(startAssertion.username, startAssertion.authenticators);
        
        return options;
    }

    async verify(verifyAssertion: VerifyAssertionInputBoundary) {
        const authenticator = await this.dbRepository.getCredentials(verifyAssertion.username);
        const response: any = this.repository.verifyChallengeAssertionResponse(verifyAssertion.registerResponse,verifyAssertion.challenge,authenticator);
        return response;

    }

    
}





import { User } from '../../../../domain/entities/User';
import { Authenticator } from '../../../../domain/entities/Authenticator';
import {UserRepository} from '../../../../domain/repositories/UserRepository';
import { SaveUserInputBoundary } from './SaveUserInputBoundary';
import { StartAttestationInputBoundary } from './StartAttestationInputBoundary';
import { VerifyAttestationInputBoundary } from './VerifyAttestationInputBoundary';


export class CreateAttestation {

    private repository: UserRepository
    private dbRepository: UserRepository

    constructor(repository: UserRepository, dbRepository: UserRepository) {
        this.repository = repository;
        this.dbRepository = dbRepository;
    }

    start (startAttestation: StartAttestationInputBoundary) {
        
        const options: any = this.repository.createAttestationOptions(startAttestation.username);    
        
        return options;
    }

    async verify(verifyAttestation: VerifyAttestationInputBoundary) {
        let user: User = new User(
            verifyAttestation.username,
            [],
            '',
            verifyAttestation.challenge
        );
        const response: any = await this.repository.verifyChallengeAttestationResponse(verifyAttestation.registerResponse,user);

        user.updateAuthenticator(
            new Authenticator(
            response.attestationInfo.credentialID,
            response.attestationInfo.credentialPublicKey,
            response.attestationInfo.counter
        ));


        return {
            "user": user,
            "verified": response.verified
        };
    }

    saveUser(input: SaveUserInputBoundary) {
        this.dbRepository.saveUser(input.user);
    }
}





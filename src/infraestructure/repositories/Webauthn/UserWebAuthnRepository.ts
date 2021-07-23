import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';

import {v4 as uuidv4} from 'uuid';
import base64url from 'base64url';

import {generateAttestationOptions,GenerateAttestationOptionsOpts, VerifyAttestationResponseOpts, verifyAttestationResponse} from '@simplewebauthn/server';

import {GenerateAssertionOptionsOpts,generateAssertionOptions,VerifyAssertionResponseOpts,verifyAssertionResponse} from '@simplewebauthn/server';




export class WebAuthnRepository extends UserRepository {

    // Attestation
    
    createAttestationOptions(username: string) {

        const opts: GenerateAttestationOptionsOpts = {
            rpName: 'SK Example',
            rpID: process.env.RP_ID || 'localhost',
            userID: uuidv4(),
            userName: username,
            userDisplayName: username,
            timeout: 60000,
            attestationType: 'indirect',            
            authenticatorSelection: {
                userVerification: 'preferred',
                requireResidentKey: false,
            },
            supportedAlgorithmIDs: [-7, -257]
        };
        
        const options = generateAttestationOptions(opts);

        return options;
    }

    async verifyChallengeAttestationResponse(credential: any, user: User) {

       try {
            const opts: VerifyAttestationResponseOpts = {
                credential: credential,
                expectedChallenge: user._challenge(),
                expectedOrigin: process.env.ORIGIN || 'https://localhost:3000',
                expectedRPID: process.env.RP_ID,
            };

            const verification = await verifyAttestationResponse(opts);
            const {verified,attestationInfo} = verification;

            return {
                "verified": verified,
                "attestationInfo": attestationInfo
            }
            
       } catch (error) {
           console.error(error);
           return {
               'error': error
           }
       }
        
    }

    // Assertion

    createAssertionOptions(username: string, authenticators: []) {

        const opts: GenerateAssertionOptionsOpts = {
            timeout: 6000,
            allowCredentials: authenticators.map(credential => ({
                id: base64url.toBuffer(credential),
                type: 'public-key'
            })),
            userVerification: 'preferred',
            rpID: process.env.RP_ID || 'localhost'
        }
        
        const options = generateAssertionOptions(opts);
        return options;
    }

    async verifyChallengeAssertionResponse(credential: any, challenge: string, authenticator: any) {

        const id = authenticator.id[0];
        const userCredential = {
            "credentialPublicKey": Buffer.from(authenticator.public_key, 'base64'),
            "credentialID": id,
            "counter": authenticator.counter
        }
        const opts: VerifyAssertionResponseOpts = {
            credential: credential,
            expectedChallenge: challenge,
            expectedOrigin: process.env.RP_ORIGIN || 'https://localhost:3000',
            expectedRPID: process.env.RP_ID || 'localhost',
            authenticator: userCredential
        }

        try {
            const {verified,assertionInfo} = verifyAssertionResponse(opts);
            return {
                "verified": verified,
                "assertionInfo": assertionInfo
            }
            
        } catch (error) {
            console.error(error);

        }
        
    }

}

const webauthnRepository: WebAuthnRepository = new WebAuthnRepository();

export default webauthnRepository;

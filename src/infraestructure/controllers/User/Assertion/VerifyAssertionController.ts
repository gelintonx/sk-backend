import {Request,Response} from 'express';
import { CreateAssertion } from '../../../../application/User/usecases/CreateAssertion/CreateAssertion';
import { VerifyAssertionInputBoundary } from '../../../../application/User/usecases/CreateAssertion/VerifyAssertionInputBoundary';
import { GetDataFromCache } from '../../../../application/User/usecases/GetDataFromCache/GetDataFromCache';

import postgresUserRepository from '../../../repositories/PostgreSQL/UserPostgresRepository';
import redisRepository from '../../../repositories/Redis/UserRedisRepository';
import webauthnRepository from '../../../repositories/Webauthn/UserWebAuthnRepository';


export class VerifyAttestationController {


    async handle(req: Request, res: Response) {

        const {registerResponse} = req.body;
        const getCache = new GetDataFromCache(redisRepository);
        const data = await getCache.execute();

        const input: VerifyAssertionInputBoundary = new VerifyAssertionInputBoundary(registerResponse,data.challenge, data.username);
        const usecase: CreateAssertion = new CreateAssertion(webauthnRepository,postgresUserRepository);
        const response = await usecase.verify(input);
        
        return res.status(200).json({
                "response": response
        });
    
    
    }
}

const verifyAssertionController:  VerifyAttestationController = new VerifyAttestationController();

export default verifyAssertionController;
import {Request,Response} from 'express';
import {CreateAttestation} from '../../../../application/User/usecases/CreateAttestation/CreateAttestation';
import { SaveUserInputBoundary } from '../../../../application/User/usecases/CreateAttestation/SaveUserInputBoundary';
import { VerifyAttestationInputBoundary } from '../../../../application/User/usecases/CreateAttestation/VerifyAttestationInputBoundary';
import { GetDataFromCache } from '../../../../application/User/usecases/GetDataFromCache/GetDataFromCache';
import postgresUserRepository from '../../../repositories/PostgreSQL/UserPostgresRepository';
import redisRepository from '../../../repositories/Redis/UserRedisRepository';
import webauthnRepository from '../../../repositories/Webauthn/UserWebAuthnRepository';


class VerifyAttestationController {

    async handle(req: Request,res: Response) {

        const {registerResponse} = req.body;
        const getCache = new GetDataFromCache(redisRepository);
        const data = await getCache.execute();
        
          
        const input: VerifyAttestationInputBoundary = new VerifyAttestationInputBoundary(registerResponse,data.username,data.challenge);
        const usecase: CreateAttestation = new CreateAttestation(webauthnRepository,postgresUserRepository);
        const response = await usecase.verify(input);
        const saveInput: SaveUserInputBoundary = new SaveUserInputBoundary(response.user);


        usecase.saveUser(saveInput);
    
        
        return res.status(200).json({
                "response": response.verified
        });
    
        
    }
}


const verifyAttestationController: VerifyAttestationController = new VerifyAttestationController();

export default verifyAttestationController;
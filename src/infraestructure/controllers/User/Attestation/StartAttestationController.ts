import {Request,Response} from 'express';
import { CheckIfUserExists } from '../../../../application/User/usecases/CheckIfUserAlreadyExists/CheckIfUserExists';
import { InputBoundary } from '../../../../application/User/usecases/CheckIfUserAlreadyExists/InputBoundary';
import {CreateAttestation} from '../../../../application/User/usecases/CreateAttestation/CreateAttestation';
import { StartAttestationInputBoundary } from '../../../../application/User/usecases/CreateAttestation/StartAttestationInputBoundary';
import { SaveCacheInputBoundary } from '../../../../application/User/usecases/SaveDataInCache/SaveCacheInputBoundary';
import { SaveDataInCache } from '../../../../application/User/usecases/SaveDataInCache/SaveDataInCache';
import postgresUserRepository from '../../../repositories/PostgreSQL/UserPostgresRepository';
import redisRepository from '../../../repositories/Redis/UserRedisRepository';
import webauthnRepository from '../../../repositories/Webauthn/UserWebAuthnRepository';



class StartAttestationController {

    async handle(req: Request,res: Response) {
        const {username} = req.body;

        const checkIfUserExists = new CheckIfUserExists(postgresUserRepository);
        const input: InputBoundary = new InputBoundary(username);
        const exists = await checkIfUserExists.execute(input);


        if (exists) {
            res.status(400).json({"Error": "User already exists"})
        }
        else {
            const startAttestation: StartAttestationInputBoundary = new StartAttestationInputBoundary(username);
            const usecase: CreateAttestation = new CreateAttestation(webauthnRepository,postgresUserRepository);
            const response = usecase.start(startAttestation);


            const saveCache: SaveDataInCache = new SaveDataInCache(redisRepository);
            const saveCacheInput: SaveCacheInputBoundary = new SaveCacheInputBoundary(username,response.challenge);
            saveCache.execute(saveCacheInput);

          
    
            return res.status(200).json({
                "response": response
            });
        }
        
     
        
        
           
          
        //return res.json(response.options);
    }
}


const startAttestationController: StartAttestationController = new StartAttestationController();

export default startAttestationController;
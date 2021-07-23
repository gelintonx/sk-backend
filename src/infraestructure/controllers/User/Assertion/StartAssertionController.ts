import {Request,Response} from 'express';
import { CheckIfUserExists } from '../../../../application/User/usecases/CheckIfUserAlreadyExists/CheckIfUserExists';
import { InputBoundary } from '../../../../application/User/usecases/CheckIfUserAlreadyExists/InputBoundary';
import { CreateAssertion } from '../../../../application/User/usecases/CreateAssertion/CreateAssertion';
import { StartAssertionInputBoundary } from '../../../../application/User/usecases/CreateAssertion/StartAssertionInputBoundary';
import { SaveCacheInputBoundary } from '../../../../application/User/usecases/SaveDataInCache/SaveCacheInputBoundary';
import { SaveDataInCache } from '../../../../application/User/usecases/SaveDataInCache/SaveDataInCache';
import postgresUserRepository from '../../../repositories/PostgreSQL/UserPostgresRepository';
import redisRepository from '../../../repositories/Redis/UserRedisRepository';
import webauthnRepository from '../../../repositories/Webauthn/UserWebAuthnRepository';



class StartAssertionController {

    async handle(req: Request,res: Response) {
        const {username} = req.body;

        const checkIfUserExists = new CheckIfUserExists(postgresUserRepository);
        const input: InputBoundary = new InputBoundary(username);
        const user = await checkIfUserExists.execute(input);


        if (user) {

            const startAssertion: StartAssertionInputBoundary = new StartAssertionInputBoundary(user.username, user.authenticators);
            const usecase: CreateAssertion = new CreateAssertion(webauthnRepository,postgresUserRepository);
            const response = usecase.start(startAssertion);

            const saveCache: SaveDataInCache = new SaveDataInCache(redisRepository);
            const saveCacheInput: SaveCacheInputBoundary = new SaveCacheInputBoundary(username,response.challenge);
            saveCache.execute(saveCacheInput);

            res.status(200).json(response);
            
        } else {
            res.status(400).json({"error": "Users does not exists"});
        }
        
     
        
        
           
          
        //return res.json(response.options);
    }
}


const startAssertionController: StartAssertionController = new StartAssertionController();

export default startAssertionController;
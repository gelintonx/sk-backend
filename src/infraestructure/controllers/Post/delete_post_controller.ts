import {Request,Response} from 'express';
import {InputBoundary} from '../../../application/Post/usecases/DeletePost/InputBoundary';
import {DeletePost} from '../../../application/Post/usecases/DeletePost/DeletePost';
import postgresrepository from '../../repositories/PostgreSQL/PostPostgresRepository';
import postgresRepository from '../../repositories/PostgreSQL/PostPostgresRepository';



class DeletePostController {

    handle(req: Request, res: Response) {
        const {id} = req.params;
        const inputBoundary: InputBoundary = new InputBoundary(id);
        const useCase: DeletePost = new DeletePost(postgresRepository);
        const response = useCase.execute(inputBoundary)

        return res.json({'response': response});
    }
}


const deletePostController = new DeletePostController();

export default deletePostController
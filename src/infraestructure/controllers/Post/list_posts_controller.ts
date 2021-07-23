import {Request,Response} from 'express';
import {InputBoundary} from '../../../application/Post/usecases/CreatePost/InputBoundary';
import {ListPosts} from '../../../application/Post/usecases/ListPosts/ListPosts';
import postgresRepository from '../../repositories/PostgreSQL/PostPostgresRepository';



class ListPostsController {

    handle(req: Request, res: Response) {
        const useCase: ListPosts = new ListPosts(postgresRepository);
        const response = useCase.execute();

        return res.status(200).json({'response': response});
    }
}


const listPostsController: ListPostsController = new ListPostsController();

export default listPostsController;
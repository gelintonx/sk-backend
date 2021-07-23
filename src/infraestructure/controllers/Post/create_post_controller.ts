import {Request,Response} from 'express';
import {InputBoundary} from '../../../application/Post/usecases/CreatePost/InputBoundary';
import {CreatePost} from '../../../application/Post/usecases/CreatePost/CreatePost';
import PostPostgresRepository from '../../repositories/PostgreSQL/PostPostgresRepository';



class CreatePostController {

    handle(req: Request, res: Response) {
        const {title,text} = req.body;
        const inputBoundary: InputBoundary = new InputBoundary(title,text,'test_owner');
        const useCase: CreatePost = new CreatePost(PostPostgresRepository);
        const response = useCase.execute(inputBoundary)

        return res.status(201).json({'response': 'Post added succesfully'});
    }
}


const createPostController: CreatePostController = new CreatePostController();

export default createPostController;
import {InputBoundary} from './InputBoundary';
import {PostRepository} from '../../../../domain/repositories/PostRepository';
import { Post } from '../../../../domain/entities/Post';

export class CreatePost {

    private repository: PostRepository<any>;
  
    
    constructor(repository: PostRepository<any>) {
        this.repository = repository;
    }
    
    
    execute (input: InputBoundary) {
        
        const post: Post = new Post(input.title,input.text, input.owner);
        const response = this.repository.createPost(post);

    }

}
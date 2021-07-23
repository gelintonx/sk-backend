import {InputBoundary} from './InputBoundary';
import {PostRepository} from '../../../../domain/repositories/PostRepository';

export class DeletePost {

    private repository: PostRepository<any>;
  
    
    constructor(repository: PostRepository<any>) {
        this.repository = repository;
    }
    
     execute (input: InputBoundary) {
        this.repository.deletePostById(input.id);
    }

}
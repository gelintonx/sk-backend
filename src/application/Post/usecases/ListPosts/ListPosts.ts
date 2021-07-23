import { PostRepository } from "../../../../domain/repositories/PostRepository";

export class ListPosts {

    private repository: PostRepository<[]>;

    constructor(repository: PostRepository<[]>) {
        this.repository = repository;
    }

    execute() {
        const response = this.repository.listPosts();
        console.log(response);
        return [];
    }

}
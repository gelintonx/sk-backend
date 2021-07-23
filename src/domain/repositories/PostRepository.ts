import {Post}  from '../entities/Post';

export abstract class PostRepository<T> {
    createPost(post: Post) {}
    abstract listPosts(): Promise<[]>
    listPostById(id: string) {}
    deletePostById(id: string) {}
    updatePost(id: string) {}
    likePost(id: string) {}
    dislikePost(id: string) {}
}
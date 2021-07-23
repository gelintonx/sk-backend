import {Pool} from 'pg';
import { Post } from '../../../domain/entities/Post';
import { PostRepository } from '../../../domain/repositories/PostRepository';

export class PostgresRepository extends PostRepository<[]> {

    private pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database : process.env.DB_DATABASE || 'sk-speech-ts',
        password: process.env.DB_PASSWORD,
        port : 5432
    });

    async createPost(post: Post) {
        await this.pool.query("INSERT INTO post(id,title,text,owner,likes,dislikes) VALUES ($1,$2,$3,$4,$5,$6)",[post._id(),post._title(),post._text(),post._owner(),post._likes(),post._dislikes()]);
    }

    async listPosts(): Promise<[]> {
        const response = await this.pool.query('SELECT * from post');
        return response.rows[0];
    }

}

const postgresPostRepository: PostgresRepository = new PostgresRepository();

export default postgresPostRepository;
import {Pool} from 'pg';
import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';

export class PostgresRepository extends UserRepository {

    private pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database : process.env.DB_DATABASE || 'sk-speech-ts',
        password: process.env.DB_PASSWORD,
        port : 5432
    });

    
    async checkIfUserAlreadyExists(username: string) {
        
        const response = await this.pool.query('SELECT * from users WHERE username = $1',[username]);
        if (response.rowCount === 0) {
            return undefined;
        }
        else {
            return response.rows[0];

        }
    }
    
    async saveUser(user: User) {

        await this.pool.query('INSERT INTO authenticator("credentialID","credentialPublicKey","counter") VALUES(ARRAY[$1],$2,$3)',[user._authenticator()[0]._credentialId().replace("\u0000",""),user._authenticator()[0]._credentialPublicKey(),user._authenticator()[0]._counter()]);
        await this.pool.query('INSERT INTO users("id","username","authenticators") VALUES($1,$2,ARRAY[$3])',[user._id(),user._username(), user._authenticator()[0]._credentialId().replace("\u0000","")]);
    }

    async getCredentials(username: string) {
        const response = await this.pool.query('SELECT authenticator.id, authenticator.public_key, authenticator.counter FROM authenticator INNER JOIN users ON users.authenticators = authenticator.id WHERE username = $1',[username]);
        return response.rows[0];
    }
}

const postgresUserRepository: PostgresRepository = new PostgresRepository();

export default postgresUserRepository;
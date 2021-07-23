import redis, { RedisClient } from 'redis';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import bluebird from 'bluebird';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


export class UserRedisRepository extends UserRepository{

    private client: RedisClient = redis.createClient({
        host: process.env.REDIS_HOST || 'localhost' ,
        port: 6379
    });

    saveDataInCache(username: string, challenge: string) {

         this.client.set('username',username);
         this.client.set('challenge',challenge);
    }

    async getDataFromCache() {
        

        let _username =  await this.client.getAsync('username');
        let _challenge = await this.client.getAsync('challenge');

        return {
            "username": _username,
            "challenge": _challenge
        }
    }    
}

const redisRepository: UserRedisRepository = new UserRedisRepository();

export default redisRepository;
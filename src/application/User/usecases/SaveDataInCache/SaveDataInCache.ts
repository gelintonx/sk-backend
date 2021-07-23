import { UserRepository } from "../../../../domain/repositories/UserRepository";
import { SaveCacheInputBoundary } from "./SaveCacheInputBoundary";

export class SaveDataInCache {

    private repository: UserRepository

    constructor(repository: UserRepository) {
        this.repository = repository
    }

    execute(input: SaveCacheInputBoundary) {
        this.repository.saveDataInCache(input.username,input.challenge);
    }

}
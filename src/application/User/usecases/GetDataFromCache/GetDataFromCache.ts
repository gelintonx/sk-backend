import { UserRepository } from "../../../../domain/repositories/UserRepository";

export class GetDataFromCache {

    private repository: UserRepository

    constructor(repository: UserRepository) {
        this.repository = repository
    }

    execute() {
        const response: any = this.repository.getDataFromCache();
        return response;
    }

}

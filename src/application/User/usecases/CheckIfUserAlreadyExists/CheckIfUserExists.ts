import { UserRepository } from '../../../../domain/repositories/UserRepository'
import {InputBoundary} from './InputBoundary'

export class CheckIfUserExists {

    private repository: UserRepository

    constructor(repository: UserRepository) {
        this.repository = repository
    }

    execute(input: InputBoundary) {
        const response: any = this.repository.checkIfUserAlreadyExists(input.username);
        return response;

    }

}
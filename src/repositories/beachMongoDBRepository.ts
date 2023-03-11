import { DefaultMongoDBRepository } from './defaultMongoDBRepository';
import { BeachRepository } from '.';
import { Beach } from '../models/beach'

export class BeachMongoDBRepository
    extends DefaultMongoDBRepository<Beach>
    implements BeachRepository {
    constructor(beachModel = Beach) {
        super(beachModel);
    }

    async findAllBeachesForUser(userId: string) {
        return await this.find({ userId });
    }
}
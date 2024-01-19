import { IGenericRepository } from './generic-repository.abstract'
import { User } from '../entities/user.entity'
import { IUserRepository } from 'src/domain/abstracts/user-repository.abstract'
import { IShortenedUrlsRepository } from 'src/domain/abstracts/shortened-urls-repository.abstract'

export abstract class IDataServices {
  abstract users: IGenericRepository<User> & IUserRepository
  abstract shortenedUrls: IShortenedUrlsRepository
}

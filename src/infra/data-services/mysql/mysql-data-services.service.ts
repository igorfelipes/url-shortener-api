import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { User } from './entities/user.entity'
import { IDataServices } from 'src/domain'
import { MysqlUserRepository } from 'src/infra/data-services/mysql/mysql-user-repository'
import { MysqlShortenedUrlsRepository } from 'src/infra/data-services/mysql/mysql-shortened-urls-repository'
import { ShortenedUrls } from 'src/infra/data-services/mysql/entities/shortened-urls.entity'

@Injectable()
export class MysqlDataServices implements IDataServices, OnApplicationBootstrap {
  users: MysqlUserRepository
  shortenedUrls: MysqlShortenedUrlsRepository

  constructor(private readonly dataSource: DataSource) {}

  onApplicationBootstrap() {
    this.users = new MysqlUserRepository(this.dataSource.getRepository(User))
    this.shortenedUrls = new MysqlShortenedUrlsRepository(this.dataSource.getRepository(ShortenedUrls))
  }
}

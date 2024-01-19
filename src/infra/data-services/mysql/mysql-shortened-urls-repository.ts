import { IShortenedUrlsRepository } from 'src/domain/abstracts/shortened-urls-repository.abstract'
import { ShortenedUrls } from 'src/infra/data-services/mysql/entities/shortened-urls.entity'
import { Repository } from 'typeorm'

export class MysqlShortenedUrlsRepository implements IShortenedUrlsRepository {
  private _repository: Repository<ShortenedUrls>

  constructor(repository: Repository<ShortenedUrls>) {
    this._repository = repository
  }
  getAll(createdBy: string): Promise<ShortenedUrls[]> {
    return this._repository.find({
      where: {
        createdBy,
        deletedAt: null
      }
    })
  }
  getByShortCode(shortCode: string): Promise<ShortenedUrls> {
    return this._repository.findOneBy({ shortCode })
  }
  create(urlShortener: ShortenedUrls): Promise<ShortenedUrls> {
    return this._repository.save(urlShortener)
  }

  async updateClickCount(shortCode: string): Promise<ShortenedUrls> {
    await this._repository
      .createQueryBuilder()
      .select('shortened_urls')
      .update()
      .set({ clickCount: () => 'clickCount + 1' })
      .where({ shortCode })
      .execute()

    return this._repository.findOneBy({ shortCode })
  }

  delete(shortCode: string): Promise<void> {
    this._repository.update(shortCode, {
      deletedAt: new Date()
    })
    return
  }
}

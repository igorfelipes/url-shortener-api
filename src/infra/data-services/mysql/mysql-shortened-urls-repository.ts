import { IShortenedUrlsRepository } from 'src/domain/abstracts/shortened-urls-repository.abstract'
import { ShortenedUrls } from 'src/infra/data-services/mysql/entities/shortened-urls.entity'
import { IsNull, Repository } from 'typeorm'

export class MysqlShortenedUrlsRepository implements IShortenedUrlsRepository {
  private _repository: Repository<ShortenedUrls>

  constructor(repository: Repository<ShortenedUrls>) {
    this._repository = repository
  }
  getAll(createdBy: string): Promise<ShortenedUrls[]> {
    return this._repository
      .createQueryBuilder('shortened_urls')
      .where({
        createdBy,
        deletedAt: IsNull()
      })
      .getMany()
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

  async delete(shortCode: string): Promise<void> {
    this._repository
      .createQueryBuilder()
      .select()
      .update()
      .set({ deletedAt: new Date() })
      .where({ shortCode })
      .execute()
    return
  }
}

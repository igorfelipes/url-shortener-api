import { ShortenedUrls } from 'src/domain/entities/shortened-urls.entity'

export abstract class IShortenedUrlsRepository {
  abstract getAll(createdBy: string): Promise<ShortenedUrls[]>
  abstract getByShortCode(shortCode: string): Promise<ShortenedUrls>
  abstract create(urlShortener: ShortenedUrls): Promise<ShortenedUrls>
  abstract updateClickCount(shortCode: string): Promise<ShortenedUrls>
  abstract delete(shortCode: string): Promise<void>
}

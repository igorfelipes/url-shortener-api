import { Injectable, NotFoundException } from '@nestjs/common'
import { IDataServices } from 'src/domain/abstracts'
import { UrlShortenerFactoryService } from 'src/domain/use-cases/url-shortener/url-shortener.service'
import { CreateShortenedUrlDto } from 'src/domain/dtos/shortened-url.dto'
import { ShortenedUrls } from '../../entities/shortened-urls.entity'
import { ConfigService } from '@nestjs/config'
import { ICreateShortenedUrlOutput, IGetShortenedUrlOutput } from 'src/domain/interfaces/shortener-url-use-cases'

@Injectable()
export class UrlShortenerUseCases {
  constructor(
    private configService: ConfigService,
    private dataServices: IDataServices,
    private urlShortenerFactoryService: UrlShortenerFactoryService
  ) {}

  async createShortedUrl(createShortenedUrlDto: CreateShortenedUrlDto): Promise<ICreateShortenedUrlOutput> {
    const shortenedUrlData = this.urlShortenerFactoryService.createNewShortedUrl(createShortenedUrlDto)
    const shortenedUrlCreated = await this.dataServices.shortenedUrls.create(shortenedUrlData)
    return {
      shortenedUrl: this.configService.get('api.shortenerBaseUrl') + `${shortenedUrlCreated.shortCode}`
    }
  }

  async getShortenedUrl(shortCode: string): Promise<IGetShortenedUrlOutput> {
    const shortenedUrl = await this.dataServices.shortenedUrls.getByShortCode(shortCode)
    return {
      clickCount: shortenedUrl.clickCount,
      shortenedUrl: this.configService.get('api.shortenerBaseUrl') + shortenedUrl.shortCode,
      originalUrl: shortenedUrl.originalUrl
    }
  }

  async getAllShortenedUrls(createdBy: string): Promise<ShortenedUrls[]> {
    return this.dataServices.shortenedUrls.getAll(createdBy)
  }

  async updateClickCount(shortCode: string): Promise<ShortenedUrls> {
    const shortenedUrl = await this.dataServices.shortenedUrls.getByShortCode(shortCode)
    if (!shortenedUrl) throw new NotFoundException('Shortened URL not found')
    return this.dataServices.shortenedUrls.updateClickCount(shortCode)
  }

  async delete(userId: string, shortCode: string): Promise<boolean> {
    const shortenedUrl = await this.dataServices.shortenedUrls.getByShortCode(shortCode)
    if (shortenedUrl.createdBy === userId) {
      await this.dataServices.shortenedUrls.delete(shortCode)
      return true
    }
    return false
  }
}

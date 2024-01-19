import { Injectable } from '@nestjs/common'
import { CreateShortenedUrlDto } from 'src/domain/dtos/shortened-url.dto'
import { ShortenedUrls } from 'src/domain/entities/shortened-urls.entity'

@Injectable()
export class UrlShortenerFactoryService {
  createNewShortedUrl(createUrlShortenerDto: CreateShortenedUrlDto) {
    const newShortenedUrl = new ShortenedUrls()
    newShortenedUrl.originalUrl = createUrlShortenerDto.originalUrl
    newShortenedUrl.createdBy = createUrlShortenerDto.createdBy
    newShortenedUrl.shortCode = this.generateShortCode()
    newShortenedUrl.clickCount = 0

    return newShortenedUrl
  }
  generateShortCode() {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const charactersLength = characters.length
    const codeLength = Math.floor(Math.random() * 6) + 1
    for (let i = 0; i < codeLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
}

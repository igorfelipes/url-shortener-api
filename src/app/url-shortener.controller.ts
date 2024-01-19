import { Controller, Post, Body, Get, UseGuards, Param, Delete, Query, Res } from '@nestjs/common'

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/infra/auth/guards/jwt-auth.guard'
import { UserId } from 'src/infra/decorators/user-id.decorator'
import { CreateShortenedUrlDto, RedirectUrlDto } from 'src/domain/dtos/shortened-url.dto'
import { UrlShortenerUseCases } from 'src/domain/use-cases/url-shortener/url-shortener.use-cases'
import { Response } from 'express'

@ApiTags('Url Shortener')
@Controller('api/url-shortener')
export class UrlShortenerController {
  constructor(private urlShortenerUseCases: UrlShortenerUseCases) {}

  @Get('redirect')
  async redirect(@Query() redirectUrlDto: RedirectUrlDto, @Res() res: Response) {
    const url = new URL(redirectUrlDto.url)
    const shortCode = url.pathname.substring(1)

    const shortenedUrl = await this.urlShortenerUseCases.updateClickCount(shortCode)
    return res.redirect(shortenedUrl.originalUrl)
  }

  @Get(':shortCode')
  async getShortenedUrl(@Param('shortCode') shortCode: string) {
    return this.urlShortenerUseCases.getShortenedUrl(shortCode)
  }

  @Post()
  async createPurchase(@Body() createShortenedDto: CreateShortenedUrlDto) {
    return this.urlShortenerUseCases.createShortedUrl(createShortenedDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAll(@UserId() userId: string) {
    return this.urlShortenerUseCases.getAllShortenedUrls(userId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':shortCode')
  async delete(@UserId() userId: string, @Param('shortCode') shortCode: string) {
    return this.urlShortenerUseCases.delete(userId, shortCode)
  }
}

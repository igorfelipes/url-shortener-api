import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUrl } from 'class-validator'

export class CreateShortenedUrlDto {
  @ApiProperty()
  @IsString()
  @IsUrl()
  originalUrl: string
  createdBy: string
}

export class RedirectUrlDto {
  @ApiProperty()
  @IsString()
  url: string
}

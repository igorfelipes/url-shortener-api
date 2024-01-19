import { Module } from '@nestjs/common'
import { DataServicesModule } from 'src/domain/data-service/data-services.module'
import { UrlShortenerFactoryService } from 'src/domain/use-cases/url-shortener/url-shortener.service'
import { UrlShortenerUseCases } from 'src/domain/use-cases/url-shortener/url-shortener.use-cases'

@Module({
  imports: [DataServicesModule],
  providers: [UrlShortenerFactoryService, UrlShortenerUseCases],
  exports: [UrlShortenerFactoryService, UrlShortenerUseCases]
})
export class UrlShortenerUseCasesModule {}

import { DataServicesModule } from 'src/domain/data-service/data-services.module'
import { CommonModule } from './common/common.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { databaseConfig } from 'src/config/database.config'
import { UserController } from 'src/app/user.controller'
import { AuthModule } from 'src/infra/auth/auth.module'
import { AuthController } from 'src/app/auth.controller'
import { AuthUseCasesModule } from 'src/domain/use-cases/auth/auth-use-cases.module'
import { UserUseCasesModule } from 'src/domain/use-cases/user/user-use-cases.module'
import { UrlShortenerUseCasesModule } from 'src/domain/use-cases/url-shortener/url-shortener.module'
import { UrlShortenerController } from 'src/app/url-shortener.controller'
import { apiConfig } from 'src/config/api.config'

@Module({
  imports: [
    CommonModule.register({
      configModule: {
        ignoreEnvFile: ['production', 'staging'].includes(process.env.NODE_ENV),
        envFilePath: '.env',
        expandVariables: ['development', 'test'].includes(process.env.NODE_ENV),
        cache: ['production', 'staging'].includes(process.env.NODE_ENV),
        isGlobal: true
      }
    }),
    ConfigModule.forFeature(databaseConfig()),
    ConfigModule.forFeature(apiConfig()),
    DataServicesModule,
    AuthModule,
    UserUseCasesModule,
    AuthUseCasesModule,
    UrlShortenerUseCasesModule
  ],
  controllers: [UserController, AuthController, UrlShortenerController],
  providers: []
})
export class MainModule {}

import { Controller, Post, Body } from '@nestjs/common'

import { UserUseCases } from 'src/domain/use-cases/user/user.use-cases'
import { CreateUserDto } from 'src/domain/dtos'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('api/user')
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @Post('signup')
  async createPurchase(@Body() createUserDto: CreateUserDto) {
    return this.userUseCases.createUser(createUserDto)
  }
}

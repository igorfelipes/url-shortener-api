import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const hasAuthorizationHeader = request.headers.authorization
    if (hasAuthorizationHeader) {
      return super.canActivate(context)
    }
    return true
  }
}

import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../infra/modules/auth/auth.service';
import { LocalAuthGuard } from '../infra/modules/auth/guards/local-auth.guard';
import { AuthRequest } from '../shared/dtos/auth/auth-request';
import { IsPublic } from '../infra/modules/auth/decorators/is-public.decorator';
import { JwtAuthGuard } from '../infra/modules/auth/guards/jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}

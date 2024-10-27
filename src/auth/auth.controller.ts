import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/auth/dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/passport/local-auth.guard';
import { Public } from 'src/decorators/customize';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: SignInDto) {
  //   return this.authService.signIn(signInDto.username, signInDto.password);
  // }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  async register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }
}

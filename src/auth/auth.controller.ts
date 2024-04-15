import { Controller, Get, Post, Body,Res, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SignUserDto } from './dto/signup-user.dto';
import { ResetPassWordDto } from './dto/reset-password.dto';
import { ResetPassWordRequestDto } from './dto/reset-password-request.dto';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { LocalAuthGuardGuard } from 'src/guard/local-auth-guard/local-auth-guard.guard';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() SignUserDto: SignUserDto) {
    return this.authService.signupService(SignUserDto);
  }


  @Post('/login')
  login(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.loginService(LoginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  logout(@Res() res: Response) {
    return this.authService.logoutService(res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/checkin')
  checkin(@Req() req: Request) {
    return this.authService.checkInService(req);
  }

  @Post('/reset-password-request')
  resetPasswordRequest(@Body() ResetPassWordRequestDto: ResetPassWordRequestDto) {
    return this.authService.resetPasswordReqService(ResetPassWordRequestDto);
  }
  @Post('/reset-password')
  resetPassword(@Body() ResetPassWordDto: ResetPassWordDto) {
    return this.authService.resetPasswordService(ResetPassWordDto);
  }
}

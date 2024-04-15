import { LoginUserDto } from './dto/login-user.dto';
import { SignUserDto } from './dto/signup-user.dto';
import { ResetPassWordDto } from './dto/reset-password.dto';
import { ResetPassWordRequestDto } from './dto/reset-password-request.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    loginService(LoginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
    signupService(SignUserDto: SignUserDto): Promise<{
        token: string;
    }>;
    logoutService(res: any): any;
    checkInService(req: any): {
        user: any;
    };
    resetPasswordReqService(ResetPassWordRequestDto: ResetPassWordRequestDto): Promise<void>;
    resetPasswordService(ResetPassWordDto: ResetPassWordDto): Promise<void>;
}

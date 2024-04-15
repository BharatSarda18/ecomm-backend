import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SignUserDto } from './dto/signup-user.dto';
import { ResetPassWordDto } from './dto/reset-password.dto';
import { ResetPassWordRequestDto } from './dto/reset-password-request.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(SignUserDto: SignUserDto): Promise<{
        token: string;
    }>;
    login(LoginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
    logout(res: Response): any;
    checkin(req: Request): {
        user: any;
    };
    resetPasswordRequest(ResetPassWordRequestDto: ResetPassWordRequestDto): Promise<void>;
    resetPassword(ResetPassWordDto: ResetPassWordDto): Promise<void>;
}

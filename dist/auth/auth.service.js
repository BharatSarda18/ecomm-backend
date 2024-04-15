"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async loginService(LoginUserDto) {
        const user = await this.usersService.findOne(LoginUserDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException("User not found");
        }
        const isPasswordMatched = await bcrypt.compare(LoginUserDto.password, user.password);
        if (!isPasswordMatched) {
            throw new common_1.UnauthorizedException("Password did not match");
        }
        const token = this.jwtService.sign({ id: user._id });
        return { token };
    }
    async signupService(SignUserDto) {
        const { email, password } = SignUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { email, password: hashedPassword, role: "user" };
        const createdUser = await this.usersService.create(user);
        const token = this.jwtService.sign({ id: createdUser._id });
        return { token };
    }
    logoutService(res) {
        res.clearCookie('jwt', {
            httpOnly: true
        });
        return res.sendStatus(200);
    }
    checkInService(req) {
        if (req.user) {
            const user = req.user;
            return { user };
        }
        throw new common_1.UnauthorizedException("user not foud");
    }
    async resetPasswordReqService(ResetPassWordRequestDto) {
        const user = await this.usersService.findOne(ResetPassWordRequestDto.email);
        if (user) {
            const token = (0, crypto_1.randomBytes)(48).toString('hex');
            user.resetPasswordToken = token;
            await user.save();
            const resetPageLink = 'http://localhost:3000/reset-password?token=' + token + '&email=' + ResetPassWordRequestDto.email;
            const subject = 'reset password for e-commerce';
            const html = `<p>Click <a href='${resetPageLink}'>here</a> to Reset Password</p>`;
        }
    }
    async resetPasswordService(ResetPassWordDto) {
        const { email, password, token } = ResetPassWordDto;
        const user = await this.usersService.findOneWithResetPassToken(email, token);
        if (user) {
            const salt = (0, crypto_1.randomBytes)(16);
            (0, crypto_1.pbkdf2)(password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
                user.salt = salt;
                await user.save();
                const subject = 'password successfully reset for e-commerce';
                const html = `<p>Successfully able to Reset Password</p>`;
                if (email) {
                }
                else {
                }
            });
        }
        else {
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
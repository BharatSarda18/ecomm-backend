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
const xlsx = require("xlsx");
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
        const { password, resetPasswordToken, ...userWithoutPass } = user.toObject();
        return { token, userWithoutPass };
    }
    async signupService(SignUserDto) {
        const { email, password } = SignUserDto;
        const ifUserAva = await this.usersService.findOne(email);
        if (ifUserAva) {
            throw new common_1.BadRequestException("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { email, password: hashedPassword, role: "user" };
        const createdUser = await this.usersService.create(user);
        const token = this.jwtService.sign({ id: createdUser._id });
        let userWithoutPass = createdUser.toObject();
        delete userWithoutPass.password;
        delete userWithoutPass.resetPasswordToken;
        return { token, userWithoutPass };
    }
    async checkInService(req) {
        if (req.user) {
            const user = req.user;
            const userInDb = await this.usersService.findOne(user.email);
            if (userInDb) {
                const { password, resetPasswordToken, ...userWithoutPass } = userInDb.toObject();
                return { user: userWithoutPass };
            }
            else {
                throw new common_1.UnauthorizedException("user not foud");
            }
        }
        throw new common_1.UnauthorizedException("user not foud");
    }
    async saveUploadedData(file) {
        const workBook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheetName = workBook.SheetNames[0];
        const workSheet = workBook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(workSheet);
        console.log("datass", workBook);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
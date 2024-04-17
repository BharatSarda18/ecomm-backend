/// <reference types="node" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { LoginUserDto } from './dto/login-user.dto';
import { SignUserDto } from './dto/signup-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    loginService(LoginUserDto: LoginUserDto): Promise<{
        token: string;
        userWithoutPass: {
            email: string;
            role: string;
            addresses: import("mongoose").Schema.Types.Mixed;
            name: string;
            salt: Buffer;
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    signupService(SignUserDto: SignUserDto): Promise<{
        token: string;
        userWithoutPass: import("../users/schema/users.schema").Users & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    checkInService(req: any): Promise<{
        user: {
            email: string;
            role: string;
            addresses: import("mongoose").Schema.Types.Mixed;
            name: string;
            salt: Buffer;
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    saveUploadedData(file: any): Promise<void>;
}

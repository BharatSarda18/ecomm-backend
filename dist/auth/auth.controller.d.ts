/// <reference types="node" />
/// <reference types="multer" />
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
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SignUserDto } from './dto/signup-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(SignUserDto: SignUserDto): Promise<{
        token: string;
        userWithoutPass: import("../users/schema/users.schema").Users & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    login(LoginUserDto: LoginUserDto): Promise<{
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
    uploadFile(file: Express.Multer.File): void;
    checkin(req: Request): Promise<{
        user: {
            email: string;
            role: string;
            addresses: import("mongoose").Schema.Types.Mixed;
            name: string;
            salt: Buffer;
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
}

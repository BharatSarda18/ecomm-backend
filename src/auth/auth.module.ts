import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.data';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

console.log(process.env.JWT_SECRET_KEY, "process.env.JWT_SECRET",process.env.JWT_EXPIREY);


@Module({
  imports: [UsersModule,
    PassportModule.register({defaultStrategy:"jwt"}),
    JwtModule.register({
       secret: jwtConstants.secret,
     // secret:ConfigService.
     // secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60min' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService,JwtStrategy,PassportModule]
})
export class AuthModule { }

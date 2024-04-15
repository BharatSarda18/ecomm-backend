import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.data';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UsersModule,
    PassportModule.register({defaultStrategy:"jwt"}),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "6000min" }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService,JwtStrategy,PassportModule]
})
export class AuthModule { }

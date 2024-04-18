import { UsersService } from './../users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './auth.data';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private UsersService:UsersService, private configService: ConfigService,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
       secretOrKey: jwtConstants.secret,
     // secretOrKey: this.configService.get('JWT_SECRET')
    //  secretOrKey:configService.get('JWT_SECRET'),
     // secretOrKey:process.env.JWT_SECRET
    });
   // this.secretOrKey = this.configService.get('JWT_SECRET');
   // console.log(configService.get(process.env.JWT_SECRET),"configService.get(process.env.JWT_SECRET)");
  }
 
  async validate(payload: any) {
    const {id}=payload;
    const user=await this.UsersService.findById(id);
    if(!user){
      throw new UnauthorizedException("user did not find");
    }
    return user;
  }
}
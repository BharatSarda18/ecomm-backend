import { UsersService } from './../users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './auth.data';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private UsersService:UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
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
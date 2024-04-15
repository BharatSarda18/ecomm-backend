import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { SignUserDto } from './dto/signup-user.dto';
import { ResetPassWordDto } from './dto/reset-password.dto';
import { ResetPassWordRequestDto } from './dto/reset-password-request.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/schema/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcryptjs";
import { Response } from 'express';
import { randomBytes ,pbkdf2 } from 'crypto';



@Injectable()
export class AuthService {
  constructor(
    // @InjectModel(Users.name) private userstModel: Model<Users>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async loginService(LoginUserDto: LoginUserDto) {
    const user = await this.usersService.findOne(LoginUserDto.email);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(LoginUserDto.password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException("Password did not match");
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };

  }

  async signupService(SignUserDto: SignUserDto) {
    const { email, password } = SignUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, password: hashedPassword, role: "user" };
    const createdUser = await this.usersService.create(user);
    const token = this.jwtService.sign({ id: createdUser._id });
    return { token };
    // const user=await new this.userstModel(LoginUserDto);
    // return user.save();
  }

  logoutService(res: any) {
    res.clearCookie('jwt', {
      httpOnly: true
    });
    return res.sendStatus(200);
  }

  checkInService(req: any) {
    if (req.user) {
      const user = req.user;
      return { user };
    }
    throw new UnauthorizedException("user not foud");

  }

  async resetPasswordReqService(ResetPassWordRequestDto: ResetPassWordRequestDto) {
    const user = await this.usersService.findOne(ResetPassWordRequestDto.email);
    if (user) {
      const token = randomBytes(48).toString('hex');
      user.resetPasswordToken = token;
      await user.save();

      const resetPageLink =
        'http://localhost:3000/reset-password?token=' + token + '&email=' + ResetPassWordRequestDto.email;
      const subject = 'reset password for e-commerce';
      const html = `<p>Click <a href='${resetPageLink}'>here</a> to Reset Password</p>`;
    }

   // return await sendMail({ to: email, subject, html });

  }

  async resetPasswordService(ResetPassWordDto: ResetPassWordDto) {
    const { email, password, token } = ResetPassWordDto;

    const user = await this.usersService.findOneWithResetPassToken(email,token);
    if (user) {
      const salt = randomBytes(16);
      pbkdf2(
        password,
        salt,
        310000,
        32,
        'sha256',
        async function (err, hashedPassword) {
      //    user.password=hashedPassword;
          user.salt = salt;
          await user.save();
          const subject = 'password successfully reset for e-commerce';
          const html = `<p>Successfully able to Reset Password</p>`;
          if (email) {
           // const response = await sendMail({ to: email, subject, html });
           // res.json(response);
          } else {
           // res.sendStatus(400);
          }
        }
      );
    } else {
     // res.sendStatus(400);
    }
  }


}

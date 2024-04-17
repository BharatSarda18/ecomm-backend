import { BadRequestException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { SignUserDto } from './dto/signup-user.dto';
import { ResetPassWordDto } from './dto/reset-password.dto';
import { ResetPassWordRequestDto } from './dto/reset-password-request.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs";
import { Response } from 'express';
import { randomBytes, pbkdf2 } from 'crypto';
import * as xlsx from 'xlsx';



@Injectable()
export class AuthService {
  constructor(
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
    const {password,resetPasswordToken,...userWithoutPass} = user.toObject();
    return { token, userWithoutPass };
  }

  async signupService(SignUserDto: SignUserDto) {
    const { email, password } = SignUserDto;
    const ifUserAva = await this.usersService.findOne(email);
    console.log(ifUserAva, "ifUserAva");
    if (ifUserAva) {
      throw new BadRequestException("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, password: hashedPassword, role: "user" };
    const createdUser = await this.usersService.create(user);
    const token = this.jwtService.sign({ id: createdUser._id });
    let userWithoutPass =createdUser.toObject();
    delete userWithoutPass.password;
    delete userWithoutPass.resetPasswordToken;
    return { token, userWithoutPass };
  }

  async checkInService(req: any) {
    if (req.user) {
      const user = req.user;
      const userInDb = await this.usersService.findOne(user.email);
      if(userInDb){
        const {password,resetPasswordToken,...userWithoutPass} = userInDb.toObject();
        return { user:userWithoutPass };
      }else{
        throw new UnauthorizedException("user not foud"); 
      }
    }
    throw new UnauthorizedException("user not foud");
  }



  async saveUploadedData(file: any) {

    const workBook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workBook.SheetNames[0];
    const workSheet = workBook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(workSheet);

    console.log("datass", workBook);


  }




}

import { Controller, Get, Post,Req, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @Get('/own')
  findAll(@Req() req) {
    const user=req.user;
    const id=user.id;
    console.log(id,"useridown")
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

 
}

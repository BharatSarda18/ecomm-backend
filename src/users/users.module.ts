import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/users.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:"jwt"}),
    MongooseModule.forFeature([{name:Users.name,schema:UsersSchema}])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}

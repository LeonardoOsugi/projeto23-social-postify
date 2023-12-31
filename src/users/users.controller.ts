import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  async createUser(@Body() body: CreateUserDTO) {
    try{
      return this.usersService.createUser(body);
    }catch(e){
      return e.message;
    }
  }
}

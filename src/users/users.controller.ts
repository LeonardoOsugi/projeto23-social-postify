import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { CreateSigninDTO } from './dto/create-signin.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  createUser(@Body() body: CreateUserDTO): void{
    this.usersService.createUser(body);
  }

  // @Post('signin')
  // createSignin(@Body() body: CreateSigninDTO): void{
  //   this.usersService.createSignin(body);
  // }
}

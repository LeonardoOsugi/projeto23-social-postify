import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  createUser(@Body() body: CreateUserDTO): void{
    // this.usersService.findUserNotPass(body);
    this.usersService.createUser(body);
  }

  @Post('signin')
  createSignin(): void{
    this.usersService.findUserPass();
    this.usersService.createSignin();
  }

}

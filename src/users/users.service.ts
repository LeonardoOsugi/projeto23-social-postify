import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { CreateSigninDTO } from './dto/create-signin.dto';
import { UsersRepository } from './repository/user.repository';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) {}
  
  async createUser(data: CreateUserDTO){
    const emailExist = await this.usersRepository.findUserByEmail(data.email);

    if(emailExist) throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const hashPassword = bcrypt.hashSync(data.password, 10);

    return await this.usersRepository.createUser({...data, password: hashPassword});
  }
  // async createSignin(data: CreateSigninDTO){
  //   const emailExist = await this.usersRepository.findUserByEmail(data.email);

  //   const isPasswordValid = bcrypt.compareSync(data.password, emailExist.password);

  //   if(!emailExist || !isPasswordValid) throw new HttpException('User Unouthorized', HttpStatus.UNAUTHORIZED);

  // }
}

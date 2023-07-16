import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { UsersRepository } from './repository/user.repository';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) {}
  
  async createUser(data: CreateUserDTO){
    const hashPassword = bcrypt.hashSync(data.password, 10);

    const emailExist = await this.usersRepository.findUserByEmail(data.email);

    if(emailExist) throw new HttpException('User already exists', HttpStatus.CONFLICT);

    return await this.usersRepository.createUser({...data, password: hashPassword});
  }
}

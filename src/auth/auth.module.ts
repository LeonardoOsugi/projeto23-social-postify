import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/repository/user.repository';
import { PrismaUsersRepository } from 'src/users/repository/implementations/prismaUsers.repository';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
  })],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UsersService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },],
})
export class AuthModule {}
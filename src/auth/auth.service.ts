import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthSigninDTO } from './dto/auth-signin.dto';
import { AuthSignupDTO } from './dto/auth-signup.dto';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, 
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
        ) {}

    async signup(body: AuthSignupDTO) {
        const user = await this.usersService.createUser(body);
        return this.createToken(user);
    }
    async signin({email, password}: AuthSigninDTO) {
        const user = await this.prisma.user.findFirst({where:{email}});

        if(!user) throw new UnauthorizedException('Email or Password Invalid');

        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword) throw new UnauthorizedException('Email or Password Invalid');

        return this.createToken(user);
    }
    createToken(user: User) {
        const token = this.jwtService.sign({
            name: user.name,
            email: user.email,
        }, {
            expiresIn: '7 days',
            subject: String(user.id),
            issuer: 'Leonardo Satoru Osugi',
            audience: 'users',
        });

        return token;
    }
}

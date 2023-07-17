import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthSigninDTO } from './dto/auth-signin.dto';
import { AuthSignupDTO } from './dto/auth-signup.dto';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersRepository } from 'src/users/repository/user.repository';
import { PublicationDTO } from './dto/publication.dto';

@Injectable()
export class AuthService {
    private AUDIENCE: string = "users";
    private ISSUER: string = "Leonardo Satoru Osugi";

    constructor(
        private readonly usersService: UsersService, 
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly usersRepository: UsersRepository,
        ) {}

    async signup(body: AuthSignupDTO) {
        const user = await this.usersService.createUser(body);
        const email = await this.usersRepository.findUserByEmail(body.email);

        if(email) throw new HttpException('User already exists', HttpStatus.CONFLICT);

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
            issuer: this.ISSUER,
            audience: this.AUDIENCE,
        });

        return { token };
    }

    checkToken(token: string){
        try{
            const data = this.jwtService.verify(token, {
                issuer: this.ISSUER,
                audience: this.AUDIENCE,
            });

            return data;
        }catch(e){
            console.log(e);
            throw new BadRequestException(e);
        }
    }

    async createPublication(user: User, {image, title, text, dateToPublish, socialMedia}: PublicationDTO) {
        const userExist = await this.prisma.user.findFirst({where: {id: user.id}})

        if(!userExist) throw new UnauthorizedException('User not exist');

        const titleExist = await this.prisma.publication.findFirst({where:{title}})
        
        if(titleExist) throw new UnauthorizedException('Title Invalid');

        return await this.prisma.publication.create({data:{
            user_id: user.id,
            image,
            title,
            text, 
            dateToPublish,
            socialMedia
        }})
    }

    async getPublication(user: User) {
        return await this.prisma.publication.findMany({where:{user_id: user.id}});
    }
}

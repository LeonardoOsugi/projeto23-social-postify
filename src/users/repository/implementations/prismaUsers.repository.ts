import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "../../dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersRepository } from "../user.repository";

@Injectable()
export class PrismaUsersRepository implements UsersRepository{
    constructor(private readonly prisma: PrismaService) {}
    async createUser({name, email, password, avatar}: CreateUserDTO){
        return await this.prisma.user.create({data: {name, email, password, avatar}});
    }

    async findUserByEmail(email: string) {
        return await this.prisma.user.findUnique({where:{email}});
    }
}
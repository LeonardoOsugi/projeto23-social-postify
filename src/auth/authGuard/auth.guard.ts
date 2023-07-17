import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { UsersService } from "src/users/users.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private readonly authService: AuthService,
        private readonly prisma: PrismaService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const {authorization} = request.headers;

        try{
            const token = authorization?.split(' ')[1];
            const data = this.authService.checkToken(token);
            const id = Number(data.sub);
            const user = await this.prisma.user.findFirst({ where: { id } });

            request.user = user;
        }catch(e){
            console.log(e)
            return false;
        }

        return true;
    }
}
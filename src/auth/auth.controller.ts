import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthSigninDTO } from './dto/auth-signin.dto';
import { AuthService } from './auth.service';
import { AuthSignupDTO } from './dto/auth-signup.dto';
import { User } from '@prisma/client';
import { AuthGuard } from './authGuard/auth.guard';
import { UserRequest} from './decorators/user.decorator';
import { PublicationDTO } from './dto/publication.dto';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @HttpCode(200)
    @Post('signin')
    async signin(@Body() body: AuthSigninDTO){
      try{
        return  this.authService.signin(body);
      } catch(e){
      return e.message;
      }     
    }

    @Post('user')
    async signup(@Body() body: AuthSignupDTO){
      try{
        return  this.authService.signup(body);
      }catch(e){
        return e.message;
      }
    }


  @UseGuards(AuthGuard)
  @Post('publication')
  async createPublication(@UserRequest() user: User, @Body() body: PublicationDTO){
    try{
      return this.authService.createPublication(user, body);
    }catch(e){
      return e.message;
    }
  }

  @UseGuards(AuthGuard)
  @Get('publications')
  async findPublications(@UserRequest() user: User){
    try{
      return this.authService.getPublication(user);
    }catch(e){
      return e.message
    }
  }
}

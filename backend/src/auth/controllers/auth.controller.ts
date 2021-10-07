import { Body, Controller, Post } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { AuthService } from '../services/auth.service';

@Controller('/auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @Post('/register')
    register(@Body() user: User):Observable<User>{
        return this.authService.registerAccount(user);
    }

    @Post('/sign-in')
    signIn(@Body() user: User):Observable<{
        token   : string,
        user    : User
    }>{
        return this.authService
            .signIn(user);
    }
}

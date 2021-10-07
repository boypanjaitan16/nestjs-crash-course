import { Injectable } from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ){}
    
    hashPassword(password:string):Observable<string>{
        return from(bcrypt.hash(password, 15));
    }

    registerAccount(user: User):Observable<User>{
        const {password}    = user;
        return this.hashPassword(password).pipe((
            switchMap((hashedPassword:string) => {
                return from(this.userRepository.save({
                    ...user,
                    password: hashedPassword
                })).pipe((
                    map((user:User) => {
                        delete user.password;

                        return user;
                    })
                ))
            })
        ))
    }

    validateUser(email:string, password:string){
        return from(this.userRepository.findOne({email}, {
            select: ['id', 'email', 'first_name', 'last_name', 'password', 'role']
        })).pipe(
            switchMap((user:User) => {
                return from(bcrypt.compare(password, user.password))
                .pipe(
                    map((isValid:boolean) => {
                        if(isValid) {
                            delete user.password;
                            return user;
                        }
                    })
                )
            })
        )
    }

    signIn(user:User):Observable<{
        token   : string,
        user    : User
    }>{
        const {email, password}    = user;
        return this.validateUser(email, password)
            .pipe(switchMap((user:User) => {
                if(user){
                    return from(this.jwtService.signAsync({user}))
                    .pipe(map((token:string) => ({
                        token,
                        user
                    })))
                }
            }))
    }
}

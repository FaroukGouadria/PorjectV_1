/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';



@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)private userRepository : UserRepository,
        private readonly userService:UserService
    ){}

 async googleLogin(req){
        if(!req.user){
            return 'no user from google'
        }
        return await this.userService.createUserSocial(req.user);
    }

}

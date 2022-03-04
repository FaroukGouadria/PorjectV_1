/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {ConflictException, HttpException, Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthCredentialsDto, LoginCredentialsDto, SocialAuthCredentialsDto, UpdateUserDto} from "../auth/dto/auth-credentials.dto";
import {UserRepository} from "./user.repository";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./jwt-payload.interface";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepository)private userRepository : UserRepository, private readonly jwtService : JwtService) {}
  async signUp(authCredentialsDto : AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }
  


  async signIn(loginCredentialsDto : LoginCredentialsDto){
    const {email, password} = loginCredentialsDto;
    const user = await this.userRepository.findOne({email});
        if(!user.isConfirmed)
          return "confirm your account"
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        email
      };
      const accessToken: string = await this.jwtService.sign(payload);
      return {accessToken};
    } else {
      throw new UnauthorizedException("Email or password invalid");
    }
  }

  async findAll():Promise<User[]>{
      return await this.userRepository.find();
  }

  async findById(_id:number):Promise<User>{
      return await this.userRepository.findOne(_id);
  }

  async findByEmail(email:string):Promise<User>{
      return await this.userRepository.findOne({email});
  }
  async createUserSocial(socialAuthCredentialsDto:SocialAuthCredentialsDto){
        const {email}=socialAuthCredentialsDto;

    try {
        const isUser = await this.userRepository.findOne({email:email});
        if(isUser){
            return  "user already exist";
        }else{
            const user = this.userRepository.create(socialAuthCredentialsDto);
            console.log(user);
            return await  this.userRepository.save(user);
        }
    } catch (error) {
         console.log(error);
        console.log(error.code);
    }
  }

   async updateUser(_id:number){
        const user = await this.userRepository.findOne(_id);
           user.isConfirmed=true;
          console.log("i m here")
        return await this.userRepository.save(user);
  }
}

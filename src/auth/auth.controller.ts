/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  Param,
  Res
} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {UserService} from "../user/user.service";
import {AuthService} from "./auth.service";
import {AuthCredentialsDto, LoginCredentialsDto} from "./dto/auth-credentials.dto";

@Controller("auth")
export class AuthController {
  constructor(private userService : UserService, private authService : AuthService) {}

  @Post("/signup")
  signUp(@Body()authCredentialsDto : AuthCredentialsDto): Promise<void> {
    return this.userService.signUp(authCredentialsDto);
  }

  @Post("/signin")
  signIn(@Body()loginCredentialsDto : LoginCredentialsDto) {
    return this.userService.signIn(loginCredentialsDto);
  }

//   @Post("/test")
//   
//   test(@Req()req) {
//     console.log(req);
//   }

  @UseGuards(AuthGuard("google"))
  @Post("/login")
  async login(@Req() req) {
    return req.user;
  }

  @Get()
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {
    //   return req.user;
  }

  @Get("/google/callback")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @Post("/confirm")
  async confirmUSerEmail(@Req() req, @Res() res){
      try {
         const {id, Etoken} = req.body
         console.log(id);
         const user = await this.userService.findById(id);
         if(!user){
           res.status(400).json({msg:"user not found"});
         }else{
           await this.userService.updateUser(user._id);
           user.isConfirmed = true;
         }
         res.status(200).json({msg:"updated successfully"})

        
      } catch (error) {
          
      }
  }
}

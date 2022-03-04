/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from '../auth/dto/auth-credentials.dto';
import { RolesGuard } from '../common/guards/roles.guards';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ){}

    @Get('/all')
    @UseGuards(AuthGuard(), RolesGuard)
    getAllUSer():Promise<User[]>{
        return this.userService.findAll();
    }

    @Post('/getone')
    @UseGuards(AuthGuard(),RolesGuard)
    getUserById(@Param('id') _id:number,@Req() req):Promise<User>{
        const user =  this.userService.findById(req.body._id);
        console.log(user);
        return user;
    }

    @Put('/update')
    async update(@Param('id') userId: number) {
    return await this.userService.updateUser(userId);
  }
}
 
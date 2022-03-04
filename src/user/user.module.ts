/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    forwardRef(()=>AuthModule),
     TypeOrmModule.forFeature([UserRepository]),
     PassportModule.register({defaultStrategy:"jwt"}),
     JwtModule.register({
       secret:"topsecret",
       signOptions:{
         expiresIn:3600000, 
       }
     })
  ],
  providers: [UserResolver, UserService,JwtStrategy],
  exports: [UserModule,UserService,JwtStrategy,PassportModule],
  controllers: [UserController]

})
export class UserModule {}

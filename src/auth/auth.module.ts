/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { GoogleStrategy } from '../strategy/google.strategy';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[ forwardRef(()=>UserModule)],
  controllers: [AuthController],
  providers: [AuthService,GoogleStrategy,UserRepository],
  exports:[AuthService]
})
export class AuthModule {}

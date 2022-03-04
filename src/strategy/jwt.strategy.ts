/* eslint-disable prettier/prettier */
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {InjectRepository} from "@nestjs/typeorm";
import {ExtractJwt, Strategy} from "passport-jwt";
import {JwtPayload} from "../user/jwt-payload.interface";
import {User} from "../user/user.entity";
import {UserRepository} from "../user/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRepository)private userRepository : UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "topsecret",
      signOptions: {
        expiresIn: "60s"
      }
    });
  }

  async validate(payload : JwtPayload) {
    const {email} = payload;
    const user: User = await this.userRepository.findOne({email});

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

/* eslint-disable prettier/prettier */
import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {config} from "dotenv";
import {Strategy, VerifyCallBack} from "passport-google-oauth20";
import { AuthService } from "../auth/auth.service";
import { Role } from "../user/user.entity";

config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private readonly authService : AuthService) {
    super({
      clientID: "971297163470-g50jvmb569bqq192v6gd232ic4k8tag5.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: ["email", "profile"]
    });
  }
  async validate(accessToken : string, refreshToken : string, profile : any, done : VerifyCallBack): Promise<any> {
    const {name, emails, photos} = profile;
    const user = {
      email: emails[0].value,
      prenom: name.givenName,
      nom: name.familyName,
      picture: photos[0].value,
      createdAt: new Date().toISOString(),
      roles:Role.BASIC,
      accessToken: accessToken
    };

    done(null, user);
  }
}

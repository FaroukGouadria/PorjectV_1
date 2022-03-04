/* eslint-disable prettier/prettier */
import {IsEmail, MaxLength, MinLength, IsString, Matches} from "class-validator";

export class AuthCredentialsDto {
  @IsEmail()
  @Matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, {message: "enter a real email"})
  email: string;
  @MinLength(6)
  @MaxLength(12)
  //  @Matches(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"/,{message:"password is too weak"})
  password: string;
  @IsString()
  nom: string;
  @IsString()
  prenom: string;
  @IsString()
  ville: string;
  @IsString()
  pays: string;
}

export class LoginCredentialsDto {
  email: string;
  password: string;
}

export class SocialAuthCredentialsDto {
  email: string;
}

export class UpdateUserDto {
  readonly nom: string;
  readonly prenom: string;
  readonly ville: string;
  readonly pays: string;
}

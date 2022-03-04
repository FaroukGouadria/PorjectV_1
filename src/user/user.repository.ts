/* eslint-disable prettier/prettier */
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {AuthCredentialsDto, SocialAuthCredentialsDto} from "../auth/dto/auth-credentials.dto";
import {Role, User} from "./user.entity";
import * as bcrypt from "bcrypt";
import {sendEmail} from "../mail/sendEmail";
import {createConfirmUrl} from "../mail/createConfirmUrl";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto : AuthCredentialsDto): Promise<void> {
    const {
      email,
      password,
      nom,
      prenom,
      ville,
      pays
    } = authCredentialsDto;
    // console.log(authCredentialsDto)
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      password: hashedPassword,
      nom,
      prenom,
      ville,
      pays,
      roles: Role.BASIC,
      isConfirmed: false
    });
    try {
      console.log(user);
      await this.save(user);
      await sendEmail(authCredentialsDto.email, await createConfirmUrl(user._id.toString()));
    } catch (error) {
      if (error.code === 11000) {
        //duplicate email
        throw new ConflictException("User Already Exist");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async createUserSocial(socialAuthCredentialsDto : SocialAuthCredentialsDto): Promise<void> {
    const {email} = socialAuthCredentialsDto;
    const user = this.create({email: email});
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === 11000) 
        throw new ConflictException("user already exist");
      console.log(error.code);
    }
  }
}

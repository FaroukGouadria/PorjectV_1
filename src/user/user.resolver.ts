/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { Query, Resolver} from "@nestjs/graphql";
import {UserService} from "./user.service";
@Injectable()
@Resolver("User")
export class UserResolver {
  constructor(private readonly userService : UserService) {}

  @Query(() => String)
  async hello() {
    return await "world";
  }

}

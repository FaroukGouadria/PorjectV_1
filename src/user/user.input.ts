/* eslint-disable prettier/prettier */
import { Field, InputType } from "type-graphql";

InputType()
export class UserInput {
  @Field()
  nom:string;

  @Field()
  prenom:string; 

  @Field()
  email: string;

  @Field()
  ville:string;

  @Field()
  pays:string;

  @Field()
  password: string;
}

/* eslint-disable prettier/prettier */
import {Entity, Column, ObjectIdColumn, CreateDateColumn} from "typeorm";



  export enum Role{
    ADMIN="admin",
    BASIC="basic"
  }

@Entity("user")
export class User {
  @ObjectIdColumn()
  _id: number;
  @Column()
  nom: string;
  @Column()
  prenom: string;
  @Column({unique:true})
  email: string;
  @Column()
  ville: string;
  @Column()
  pays: string;
  @Column()
  password: string;
  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  updatedAt: Date;
  @Column({default : Role.ADMIN})
  roles:string;
  @Column()
  accessToken:string;
  @Column()
  picture:string;
  @Column({default:false})
  isConfirmed:boolean;
}

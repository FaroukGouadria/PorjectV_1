/* eslint-disable prettier/prettier */
import {v4} from "uuid";
import * as jwt from 'jsonwebtoken';
export const createConfirmUrl = async (userId:string) => {

  const token = jwt.sign(userId,"secret");

    return `http://localhost:3000/${userId}/confirm/${token}`;
}
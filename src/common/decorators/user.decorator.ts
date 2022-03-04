/* eslint-disable prettier/prettier */
import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {GqlExecutionContext} from "@nestjs/graphql";
import { User } from "../../user/user.entity";

export const CurrentUser = createParamDecorator((data : unknown, context : ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});


export const getUser =createParamDecorator((
  _data,ctx:ExecutionContext):User=>{
    const req=ctx.switchToHttp().getRequest();
    return req.user;  
  }
) 

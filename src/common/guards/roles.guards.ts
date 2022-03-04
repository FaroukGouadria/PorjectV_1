/* eslint-disable prettier/prettier */

import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";


@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context : ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if( user && user.roles==="admin"){
            console.log(user.roles);
            return true;
        }
         console.log(user.roles);
        throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);

  }
}
 
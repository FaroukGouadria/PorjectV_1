/* eslint-disable prettier/prettier */
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {Module} from "@nestjs/common";
import {GraphQLModule} from "@nestjs/graphql";
import {TypeOrmModule} from "@nestjs/typeorm";
import {join} from "path";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {UserModule} from "./user/user.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: "default",
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "testdb",
      autoLoadEntities:true,
      synchronize:true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

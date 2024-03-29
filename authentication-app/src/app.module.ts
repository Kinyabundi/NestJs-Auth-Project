import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
// import typeorm from "./config/typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [typeorm] }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => config.get("typeorm"),
  }),AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

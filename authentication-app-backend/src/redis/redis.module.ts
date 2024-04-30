import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule {}

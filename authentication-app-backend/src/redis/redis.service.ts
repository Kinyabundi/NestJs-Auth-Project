import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    private readonly client: Redis;

    constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT, 10),
            // password: process.env.REDIS_PASSWORD,
        });
    }
    async get(key: string): Promise<string | null> {
        return this.client.get(key);
     }
    
     async set(key: string, value: string, expire?: number): Promise<void> {
        await this.client.set(key, value, "EX", expire ?? 60);
     }
}

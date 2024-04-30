import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Task, { TaskStatus } from 'src/entities/task.entity';
import { UserService } from 'src/user/user.service';
import * as crypto from 'crypto';
import { RedisService } from 'src/redis/redis.service';


@Injectable()
export class TaskService {
    constructor(
        @InjectQueue('task-queue') private taskQueue: Queue,
        private userService: UserService,
        @InjectRepository(Task) private taskRepo: Repository<Task>,
        private readonly redisService: RedisService,
    ) { }


  
 private getHashKey(): string {

    return 'CACHE_ASIDE_ALL_TASKS';
 }

    async createTask(data: Task) {

        try {
            // retrieve user from database using user id
            const user = await this.userService.getUserById(data.user as any);

            // create  a new task instance
            const task = new Task();
            task.title = data.title;
            task.description = data.description;
            task.scheduledTime = data.scheduledTime;
            task.user = user;
            task.status = TaskStatus.PENDING;

            // save task to database
            const savedTask = await this.taskRepo.save(task);
            
            if (typeof data.scheduledTime === 'string') {
                data.scheduledTime = new Date(data.scheduledTime);
            }
            
            console.log(typeof data.scheduledTime);
            // schedule email to be sent to user
            const delay = data.scheduledTime.getTime() - Date.now();

            // add task to queue
            await this.taskQueue.add('sendEmail', {
                to: user.email,
                subject: 'Task Created',
                body: `Task ${data.title} has been created, with the description: ${data.description}`,
            }, {
                delay: delay,
            });

            return savedTask;
        } catch (err) {
            console.log(err);
            throw new Error('An error was encountered while creating task');
        }
    }

    async getAllTasks(): Promise<Task[]> {
        const hashKey = this.getHashKey();
        let tasks: Task[] = [];
    
        // get tasks from Redis
        const cachedData = await this.redisService.get(hashKey);
        if (cachedData) {
          tasks = JSON.parse(cachedData);
          console.log('Cache hit in the redis');
        //   console.log(tasks)
        } else {
          console.log('Cache miss in the redis');
          // If not in cache, fetch from the database
          tasks = await this.taskRepo.find();
          // Store the tasks in Redis for future requests
          await this.redisService.set(hashKey, JSON.stringify(tasks),
        //   {EX: 60}
        );
        }
    
        return tasks;
     }


    
}

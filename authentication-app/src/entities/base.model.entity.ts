import {BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"

export default abstract class BaseModel extends BaseEntity {
     @PrimaryGeneratedColumn()
     id: string;

     @CreateDateColumn()
     createdAt: Date;

     @UpdateDateColumn()
     updatedAt: Date;
}
import { Column, Entity } from 'typeorm';
import BaseModel from './base.model.entity';

export enum SystemRole {
  ADMIN = 'admin',
  INTEGRATOR = 'integrator',
}

@Entity()
export default class User extends BaseModel {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;


  @Column()
  password: string;

  @Column({ type: 'enum', enum: SystemRole, default: SystemRole.INTEGRATOR })
  systemRole: SystemRole;
}

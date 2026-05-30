import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Roles from './roles';
import { Restaurant } from './restaurant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: Roles.USER })
  role!: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.users, { nullable: true, onDelete: 'SET NULL' })
  restaurant!: Restaurant;
}
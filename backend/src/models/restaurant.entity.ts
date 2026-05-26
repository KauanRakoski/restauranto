import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Order } from './order.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  document!: string;

  @Column()
  address!: string;

  @Column({ nullable: true })
  phone!: string;

  @OneToMany(() => Category, (category) => category.restaurant)
  categories!: Category[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders!: Order[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
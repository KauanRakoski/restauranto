import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Item } from './item.entity';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.categories, { onDelete: 'CASCADE' })
  restaurant!: Restaurant;

  @OneToMany(() => Item, (item) => item.category)
  items!: Item[];
}
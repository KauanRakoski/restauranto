import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { ItemIngredient } from './item-ingredients.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column({ nullable: true })
  photoUrl!: string;

  @ManyToOne(() => Category, (category) => category.items, { onDelete: 'CASCADE' })
  category!: Category;

  @OneToMany(
    () => ItemIngredient,
    ingredient => ingredient.item,
    { cascade: true }
  )
  ingredients!: ItemIngredient[];
}
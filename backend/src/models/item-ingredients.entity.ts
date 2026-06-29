import { Entity, PrimaryGeneratedColumn, ManyToOne, Column} from "typeorm";
import { StockItem } from "./stock-item.entity";
import { Item } from "./item.entity";
@Entity()
export class ItemIngredient {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Item, item => item.ingredients, {
    onDelete: 'CASCADE'
  })
  item!: Item;

  @ManyToOne(() => StockItem, stock => stock.itemIngredients)
  stockItem!: StockItem;

  @Column('decimal', {
    precision: 10,
    scale: 2
  })
  amount!: number;
}

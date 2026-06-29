import { Module } from "@nestjs/common";
import { StockController } from "./stock.controller";
import { StockService } from "./stock.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockItem } from "src/models/stock-item.entity";
import { Item } from "src/models/item.entity";
import { ItemIngredient } from "src/models/item-ingredients.entity";

@Module({
    imports: [TypeOrmModule.forFeature([StockItem, Item, ItemIngredient])],
    controllers: [StockController],
    providers: [StockService]
})
export class StockModule {}
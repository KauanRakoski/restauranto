import { Module } from "@nestjs/common";
import { ItemsController } from "./items.controller";
import { ItemsService } from "./items.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "src/models/item.entity";
import { Category } from "src/models/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Item, Category])],
    controllers: [ItemsController],
    providers: [ItemsService]
})
export class ItemsModule {}
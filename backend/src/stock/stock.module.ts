import { Module } from "@nestjs/common";
import { StockController } from "./stock.controller";
import { StockService } from "./stock.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockItem } from "src/models/stock-item.entity";

@Module({
    imports: [TypeOrmModule.forFeature([StockItem])],
    controllers: [StockController],
    providers: [StockService]
})
export class ItemsModule {}
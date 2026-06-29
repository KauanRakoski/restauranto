import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StockItem } from "src/models/stock-item.entity";
import { Repository } from "typeorm";
import { CreateStockItemDto } from "src/dtos/stock-item.dto";

@Injectable()
export class StockService {
    constructor(
        @InjectRepository(StockItem)
        private stockRepository: Repository<StockItem>
    ){}

    async create(dto: CreateStockItemDto, restaurantId: string){
        const stockItem = this.stockRepository.create({
            name: dto.name,
            measureUnit: dto.measureUnit,
            cost: dto.cost,
            stockAmount: dto.stockAmount,
            restaurant: { id: restaurantId }
        });

        return await this.stockRepository.save(stockItem)
    }

    async findAll(restaurantId: string) {
        return await this.stockRepository.find({
            where: { restaurant: { id: restaurantId } }
        });
    }

    async findOne(id: number, restaurantId: string) {
        const item = await this.stockRepository.findOne({
            where: { id, restaurant: { id: restaurantId } }
        });

        if (!item) {
            throw new NotFoundException('Item de estoque não encontrado.');
        }

        return item;
    }
}
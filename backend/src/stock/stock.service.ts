import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StockItem } from "src/models/stock-item.entity";
import { Item } from "src/models/item.entity";
import { ItemIngredient } from "src/models/item-ingredients.entity";
import { Repository, DataSource } from "typeorm";
import { CreateStockItemDto, UpdateStockItemDto } from "src/dtos/stock-item.dto";

@Injectable()
export class StockService {
    constructor(
        @InjectRepository(StockItem)
        private stockRepository: Repository<StockItem>,
        private dataSource: DataSource
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

    async update(id: number, dto: UpdateStockItemDto, restaurantId: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const stockItem = await queryRunner.manager.findOne(StockItem, {
                where: { id, restaurant: { id: restaurantId } }
            });

            if (!stockItem) {
                throw new NotFoundException('Item de estoque não encontrado.');
            }

            const oldCost = Number(stockItem.cost);
            Object.assign(stockItem, dto);
            const savedStockItem = await queryRunner.manager.save(stockItem);

            if (dto.cost !== undefined && Number(dto.cost) !== oldCost) {
                const ingredients = await queryRunner.manager.find(ItemIngredient, {
                    where: { stockItem: { id: stockItem.id } },
                    relations: { item: { ingredients: { stockItem: true } } }
                });

                const uniqueItemsMap = new Map<string, Item>();
                for (const ing of ingredients) {
                    uniqueItemsMap.set(ing.item.id, ing.item);
                }

                for (const item of uniqueItemsMap.values()) {
                    let newCost = 0;
                    for (const itemIng of item.ingredients) {
                        const ingCost = itemIng.stockItem.id === stockItem.id ? Number(dto.cost) : Number(itemIng.stockItem.cost);
                        const ingStockAmount = itemIng.stockItem.id === stockItem.id && dto.stockAmount !== undefined ? Number(dto.stockAmount) : Number(itemIng.stockItem.stockAmount);
                        
                        if (ingStockAmount > 0) {
                            newCost += ((ingCost / ingStockAmount) * Number(itemIng.amount));
                        }
                    }
                    
                    item.currentCost = newCost;
                    item.currentProfit = Number(item.price) - newCost;
                    await queryRunner.manager.save(item);
                }
            }

            await queryRunner.commitTransaction();
            return savedStockItem;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../models/item.entity';
import { Category } from '../models/category.entity';
import { CreateItemDto } from "../dtos/item.dto";

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {}

    async createItem(createItemDto: CreateItemDto, restaurantId: string, photoUrl?: string): Promise <Item>{
        const { categoryId, ...itemData } = createItemDto;

        const category = await this.categoryRepository.findOne({
            where: { id: categoryId },
            relations: { restaurant: true }
        });

        if (!category) {
            throw new NotFoundException('Categoria não encontrada.');
        }

        if (category.restaurant?.id !== restaurantId) {
            throw new ForbiddenException('Você não pode adicionar um item a uma categoria de outro restaurante.');
        }

        const newItem = this.itemRepository.create({
          ...itemData,
          photoUrl,
          category: { id: categoryId },
        });

        return this.itemRepository.save(newItem);
    }

    async getItems(){
        const items = await this.itemRepository.find({
            relations: {
                category: true
            }
        });

        return {data: items}
    }
}
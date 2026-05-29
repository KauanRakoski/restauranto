import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../models/category.entity';
import { CreateCategoryDto } from 'src/dtos/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { restaurantId, ...categoryData } = createCategoryDto;
    const newCategory = this.categoryRepository.create({
      ...categoryData,
      restaurant: { id: restaurantId },
    });
    return this.categoryRepository.save(newCategory);
  }
}

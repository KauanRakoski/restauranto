import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../models/restaurant.entity';
import { User } from '../models/user.entity';
import { CreateRestaurantDto } from '../dtos/restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createRestaurant(createRestaurantDto: CreateRestaurantDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const newRestaurant = this.restaurantRepository.create(createRestaurantDto);
    const savedRestaurant = await this.restaurantRepository.save(newRestaurant);

    user.restaurant = savedRestaurant;
    await this.userRepository.save(user);

    return savedRestaurant;
  }
}

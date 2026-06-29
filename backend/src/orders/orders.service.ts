import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../models/order.entity';
import { OrderItem } from '../models/order-item.entity';
import { Item } from '../models/item.entity';
import { Restaurant } from '../models/restaurant.entity';
import { CreateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { restaurantId, items: itemsDto } = createOrderDto;

    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException('Restaurante não encontrado.');
    }

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    for (const itemDto of itemsDto) {
      const item = await this.itemRepository.findOne({ where: { id: itemDto.itemId } });
      
      if (!item) {
        throw new NotFoundException(`Item do cardápio não encontrado (ID: ${itemDto.itemId})`);
      }

      const orderItem = new OrderItem();
      orderItem.item = item;
      orderItem.quantity = itemDto.quantity;
      orderItem.unitPrice = item.price;

      totalAmount += Number(item.price) * itemDto.quantity;
      orderItems.push(orderItem);
    }

    const order = new Order();
    order.restaurant = restaurant;
    order.items = orderItems;
    order.totalAmount = totalAmount;
    order.status = 'PENDING';
    
    return this.orderRepository.save(order);
  }

  async getOrders(restaurantId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: {
        items: {
          item: true
        }
      },
      order: { createdAt: 'DESC' },
    });
  }
}

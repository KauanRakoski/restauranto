import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from '../models/order.entity';
import { OrderItem } from '../models/order-item.entity';
import { Item } from '../models/item.entity';
import { Restaurant } from '../models/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Item, Restaurant])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}

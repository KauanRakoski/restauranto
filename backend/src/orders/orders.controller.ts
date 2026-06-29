import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../dtos/order.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Restaurante ou item não encontrado.' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Obtém todos os pedidos do restaurante logado' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos.' })
  async getOrders(@Req() req: any) {
    return this.ordersService.getOrders(req.user.restaurantId);
  }
}

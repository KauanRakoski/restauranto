import { Controller, Get, Post, Body, Req, ForbiddenException, Param } from "@nestjs/common";
import { StockService } from "./stock.service";
import { CreateStockItemDto } from "src/dtos/stock-item.dto";

@Controller('stock')
export class StockController {
    constructor(
        private readonly stockService: StockService
    ){}

    @Post()
    async createStockItem(
        @Body() body: CreateStockItemDto,
        @Req() req: any,
    ){
        if (!req.user.restaurantId) {
            throw new ForbiddenException('Usuário não possui restaurante vinculado.');
        }

        return this.stockService.create(body, req.user.restaurantId)
    }

    @Get()
    async getStockItems(
        @Req() req: any,
    ){
        if (!req.user.restaurantId) {
            throw new ForbiddenException('Usuário não possui restaurante vinculado.');
        }

        return this.stockService.findAll(req.user.restaurantId);
    }

    @Get(':id')
    async getStockItem(
        @Param('id') id: string,
        @Req() req: any,
    ){
        if (!req.user.restaurantId) {
            throw new ForbiddenException('Usuário não possui restaurante vinculado.');
        }

        return this.stockService.findOne(+id, req.user.restaurantId);
    }
}
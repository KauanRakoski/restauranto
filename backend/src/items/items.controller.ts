import { Body, Controller, Get, Post, UseGuards, Req, ForbiddenException, UseInterceptors, UploadedFile } from "@nestjs/common";
import { CreateItemDto } from "src/dtos/item.dto";
import { ItemsService } from "./items.service";
import { FileInterceptor } from '@nestjs/platform-express';

import { ApiOperation, ApiConsumes } from "@nestjs/swagger";

import { AuthGuard } from '@nestjs/passport';

@Controller("/items")
export class ItemsController {
    constructor(private readonly itemsService: ItemsService){}

    @ApiOperation({ summary: 'Creates a new Item for the restaurant' })
    @ApiConsumes('multipart/form-data')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('photo'))
    @Post()
    async createItem (
        @Body() body: CreateItemDto,
        @Req() req: any,
        @UploadedFile() photo?: Express.Multer.File
    ){
        if (!req.user.restaurantId) {
            throw new ForbiddenException('Usuário não possui restaurante vinculado.');
        }
        return this.itemsService.createItem(body, req.user.restaurantId, photo?.path);
    }

    @ApiOperation({summary: 'Gets all Restaurant items'})
    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getItems(){
        return this.itemsService.getItems();
    }
}
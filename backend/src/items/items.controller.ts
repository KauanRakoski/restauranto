import { Body, Controller, Post } from "@nestjs/common";
import { CreateItemDto } from "src/dtos/item.dto";

import { ApiOperation, ApiConsumes } from "@nestjs/swagger";

@Controller("/items")
export class ItemsController {
    constructor(){}

    @ApiOperation({ summary: 'Creates a new Item for the restaurant' })
    @ApiConsumes('multipart/form-data')
    @Post()
    async createItem (@Body() body: CreateItemDto){

    }
}
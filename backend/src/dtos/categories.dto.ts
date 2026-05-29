import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ example: 'Bebidas' })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ example: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    restaurantId!: string;
}
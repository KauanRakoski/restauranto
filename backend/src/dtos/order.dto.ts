import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsArray, ValidateNested, ArrayNotEmpty, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'UUID do item do cardápio' })
  @IsUUID()
  itemId: string;

  @ApiProperty({ example: 2, description: 'Quantidade do item selecionado. No mínimo 1 unidade.' })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'UUID do restaurante' })
  @IsUUID()
  restaurantId: string;

  @ApiProperty({ type: [CreateOrderItemDto], description: 'Lista de itens do pedido' })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}

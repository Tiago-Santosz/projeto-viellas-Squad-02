import { IsNotEmpty, IsString, Matches, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/,
    { message: 'document must be a valid CPF or CNPJ' }
  )
  document: string; 

  @IsNotEmpty()
  @Type(() => Number) 
  @IsNumber()
  subscriptionPlanId: number;
}

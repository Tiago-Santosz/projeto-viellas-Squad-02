import { Type } from 'class-transformer';
import { ValidateNested, IsOptional } from 'class-validator';
import { Purchase } from '../../purchase/entities/purchase.entity';
import { Plan } from '../entities/plan.entity';
import { Photo } from '../../photo/entities/photo.entity';

export class UpdateCustomerDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => Plan)
  subscriptionPlan?: Plan;

  @IsOptional()
  @ValidateNested()
  @Type(() => Purchase)
  purchase?: Purchase;

  @IsOptional()
  @ValidateNested()
  @Type(() => Photo)
  photoPost?: Photo;

  @IsOptional()
  @ValidateNested()
  @Type(() => Photo)
  photoDownload?: Photo;
}

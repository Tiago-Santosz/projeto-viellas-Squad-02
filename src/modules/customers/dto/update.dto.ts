import { Purchase } from "src/modules/purchase/entities/purchase.entity";
import { Plan } from "../entities/plan.entity";
import { Photo } from "src/modules/photo/entities/photo.entity";

export class UpdateCustomerDto {
    subscriptionPlan?: Plan
    purchase?: Purchase
    photoPost?: Photo
    photoDownload?: Photo
}
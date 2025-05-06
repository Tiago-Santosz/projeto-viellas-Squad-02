import { EnumPaymentMethod } from "src/modules/common/enums/enum-paymentMethod.enum";
import { EnumPlanType } from "src/modules/common/enums/enum-planType.enum";

export class UpdatePurchaseDto {
    type?: EnumPlanType;
    price?: number;
    paymentMethod?: EnumPaymentMethod;
}
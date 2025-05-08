import { EnumCategory } from "src/modules/common/enums/enum-category.enum";

export class UpdatePhotoDto{
    url?: string;
    title?: string;
    owner?: string;
    description?: string;
    category?: EnumCategory;
    date?: Date;
}
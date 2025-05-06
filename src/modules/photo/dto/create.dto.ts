import { EnumCategory } from "src/modules/common/enums/enum-category.enum";

export class CreatePhotoDto {
    url: string;
    title: string;
    description: string;
    category: EnumCategory;
}
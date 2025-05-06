export interface UpdateUserDto {
    name?: string;
}
export class UpdateUserResponseDto {
    id: number;
    name: string;
    email: string;
}
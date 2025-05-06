export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}

export interface ReturnUserDto {
    id: number;
    name: string;
    email: string;
}
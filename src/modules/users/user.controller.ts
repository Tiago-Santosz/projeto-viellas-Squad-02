import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterDto } from "./dto/register.dto";
import { UpdateUserDto } from "./dto/update.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get(':id')
    async findById(@Param('id') id: number) {
        const user = await this.userService.findUserById(+id);
        return user;
    }
    
    @Post()
    async create(@Body() user: RegisterDto) {
        return this.userService.createUser(user);
    }
    
    @Put(':id')
    async update(@Param('id') id: number, @Body() user: UpdateUserDto) {
        const existingUser = await this.userService.findUserById(+id);
        return this.userService.updateUser({ ...existingUser, ...user });
    }
}

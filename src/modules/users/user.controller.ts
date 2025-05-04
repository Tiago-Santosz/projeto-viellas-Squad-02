import { Controller, Get, NotFoundException, Param, Put, RequestMapping } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get(':id')
    async findById(@Param('id') id: number) {
        const user = await this.userService.findUserById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    /*
    @Put(':id')
    async update(@Param('id') id: number, @RequestMapping() user: User) {
        const existingUser = await this.userService.findUserById(id);
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        return this.userService.updateUser({ ...existingUser, ...user });
    }
    */
}

import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
    async createUser(user: any): Promise<User> {
        const newUser = new User(user.name, user.email, user.password);
        return this.userRepository.create(newUser);
    }
    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }
    async findUserById(id: number): Promise<User | null> {
        return this.userRepository.findById(id);
    }
    async updateUser(user: User): Promise<User> {
        return this.userRepository.update(user);
    }
    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}  
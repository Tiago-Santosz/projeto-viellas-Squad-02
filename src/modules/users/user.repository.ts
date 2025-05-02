import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

export class UserRepository {
    constructor(private readonly userRepository: Repository<User>) {}

    async create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async update(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
import { Repository } from "typeorm";
import { Admin } from "./entities/admin.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class AdminRepository {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>) {}

    async create(admin: Admin): Promise<Admin> {
        return this.adminRepository.save(admin);
    }

    async findByEmail(email: string): Promise<Admin | null> {
        return this.adminRepository.findOne({ where: { email } });
    }

    async findById(id: number): Promise<Admin | null> {
        return this.adminRepository.findOne({ where: { id } });
    }

    async update(admin: Admin): Promise<Admin> {
        return this.adminRepository.save(admin);
    }

    async delete(id: number): Promise<void> {
        await this.adminRepository.delete(id);
    }
}
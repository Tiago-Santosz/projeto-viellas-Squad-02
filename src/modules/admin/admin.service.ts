import { Injectable } from "@nestjs/common";
import { AdminRepository } from "./admin.repository";
import { Admin } from "./entities/admin.entity";

@Injectable()
export class AdminService {
    constructor(private readonly adminRepository: AdminRepository) {}
    async createadmin(admin: any): Promise<Admin> {
        const newadmin = new admin(admin.name, admin.email, admin.password);
        return this.adminRepository.create(newadmin);
    }
    async findadminByEmail(email: string): Promise<Admin | null> {
        return this.adminRepository.findByEmail(email);
    }
    async findadminById(id: number): Promise<Admin | null> {
        return this.adminRepository.findById(id);
    }
    async updateadmin(admin: Admin): Promise<Admin> {
        return this.adminRepository.update(admin);
    }
    async deleteadmin(id: number): Promise<void> {
        await this.adminRepository.delete(id);
    }
}  
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Purchase } from "./entities/purchase.entity";
import { UpdatePurchaseDto } from "./dto/update.dto";

@Injectable()
export class PurchaseRepository {
    constructor(
        @InjectRepository(Purchase)
        private readonly purchaseRepository: Repository<Purchase>
    ) {}

    async create(purchase: Purchase): Promise<Purchase> {
        return this.purchaseRepository.save(purchase);
    }

    async findAll(): Promise<Purchase[]> {
        return this.purchaseRepository.find();
    }

    async findById(id: number): Promise<Purchase | null> {
        return this.purchaseRepository.findOneBy({ id });
    }

    async update(id: number, updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
        const purchase = await this.purchaseRepository.preload({ id, ...updatePurchaseDto });

        if (!purchase) {
            throw new NotFoundException(`Purchase with id ${id} not found`);
        }

        return this.purchaseRepository.save(purchase);
    }

    async delete(id: number): Promise<void> {
        const result = await this.purchaseRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Purchase with id ${id} not found`);
        }
    }
}

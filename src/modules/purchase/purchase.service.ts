import { Injectable, NotFoundException } from "@nestjs/common";
import { PurchaseRepository } from "./purchase.repository";
import { Purchase } from "./entities/purchase.entity";
import { UpdatePurchaseDto } from "./dto/update.dto";

@Injectable()
export class PurchaseService {
  constructor(private readonly purchaseRepository: PurchaseRepository) {}

  create(purchase: Purchase): Promise<Purchase> {
    return this.purchaseRepository.create(purchase);
  }

  findAll(): Promise<Purchase[]> {
    return this.purchaseRepository.findAll();
  }

  findById(id: number): Promise<Purchase | null> {
    return this.purchaseRepository.findById(id);
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    return this.purchaseRepository.update(id, updatePurchaseDto);
  }

  delete(id: number): Promise<void> {
    return this.purchaseRepository.delete(id);
  }
}

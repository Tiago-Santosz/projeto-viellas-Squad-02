import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Photo } from "./entities/photo.entity";
import { UpdatePhotoDto } from "./dto/update.dto";

@Injectable()
export class PhotoRepository {
    constructor(
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>
    ) {}


    async create(photo: Photo): Promise<Photo> {
        return this.photoRepository.save(photo);
    }

    async findAll(): Promise<Photo[]> {
        return this.photoRepository.find();
    }

    async findById(id: number): Promise<Photo | null> {
        return this.photoRepository.findOneBy({ id });
    }

    async update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
        const photo = await this.photoRepository.preload({ id, ...updatePhotoDto });

        if (!photo) {
            throw new NotFoundException(`Photo with id ${id} not found`);
        }

        return this.photoRepository.save(photo);
    }

    async delete(id: number): Promise<void> {
        const result = await this.photoRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Photo with id ${id} not found`);
        }
    }
}

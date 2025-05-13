// photo.service.ts
import { Injectable } from "@nestjs/common";
import { PhotoRepository } from "./photo.repository";
import { Photo } from "./entities/photo.entity";
import { UpdatePhotoDto } from "./dto/update.dto";
import { CreatePhotoDto } from "./dto/create.dto";

@Injectable()
export class PhotoService {
    constructor(private readonly photoRepository: PhotoRepository) {}

    async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
        const photo = new Photo();
        Object.assign(photo, createPhotoDto);
        return this.photoRepository.create(photo);
    }

    async findAll(): Promise<Photo[]> {
        return this.photoRepository.findAll();
    }

    async findById(id: number): Promise<Photo> {
        const photo = await this.photoRepository.findById(id);
        if (!photo) {
            throw new Error(`Photo with id ${id} not found`);
        }
        return photo;
    }

    async update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
        return this.photoRepository.update(id, updatePhotoDto);
    }

    async delete(id: number): Promise<void> {
        return this.photoRepository.delete(id);
    }
}

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "./entities/user.entity";
import { RegisterDto, ReturnUserDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto, UpdateUserResponseDto } from "./dto/update.dto";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
    async createUser(user: RegisterDto): Promise<ReturnUserDto> {
        const validEmail = await this.validateEmail(user.email);
        const isExistingUser = await this.validateExistingUser(user.email);
        if(this.validatePassword(user.password)){
            const hashedPassword = await this.hashPassword(user.password);
    
            const newUser = new User(user.name, user.email, hashedPassword);
            const addedUser = await this.userRepository.create(newUser);
            return {
                id: addedUser.id,
                name: addedUser.name,
                email: addedUser.email
            };
        }
        throw new BadRequestException("An error occurred");
    }
    
    async updateUser(user: User): Promise<UpdateUserResponseDto> {
        const updateUser = await this.userRepository.update(user);
        return { 
            id: updateUser.id, 
            name: updateUser.name, 
            email: updateUser.email
        }
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
    
    async findUserByEmail(email: string): Promise<User> {
        this.validateEmail(email);
        const existingUser = await this.userRepository.findByEmail(email);
        if (!existingUser) {
            throw new NotFoundException("User not found");
        }
        return existingUser;
    }

    async findUserById(id: number): Promise<User> {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new BadRequestException("User not found");
        }
        return existingUser;
    }
    


    // Validation methods
    // These methods are used to validate the email and password format
    async validateEmail(email: string): Promise<string> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new BadRequestException("Invalid email format");
        }
        return email;
    }

    async validateExistingUser(email: string): Promise<string> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new BadRequestException("Invalid email format");
        }  
        return email
    }

    validatePassword(password: string): boolean {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {    
            throw new BadRequestException("Invalid password format");
        }
        return true;
    }

    async hashPassword(plainPassword: string): Promise<string> {
        const saltRounds = 12; 
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(plainPassword, salt);
        return hash;
    }

    async validateUserCredentials(email: string, password: string): Promise<User> {
        const user = await this.findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new BadRequestException('Invalid credentials');
        }
        return user;
    }
    

}  
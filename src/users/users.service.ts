import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserNotFoundException } from '../common/exceptions/not-found.exception';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    create(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new UserNotFoundException(id);
        }
        return user;
    }

    async update(id: number, user: User): Promise<{ message: String }> {
        const updateResult = await this.usersRepository.update(id, user);

        if (updateResult.affected === 0) {
            throw new UserNotFoundException(id);
        }

        return { message: "Updation successful" }
    }

    async remove(id: number): Promise<{message:String}> {
        const deleteResult = await this.usersRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new UserNotFoundException(id);
        }

        return { message: "Deletion successful" }
    }
}

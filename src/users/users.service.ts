import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserNotFoundException } from '../common/exceptions/not-found.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(user: User): Promise<User> {
        if (!user.name || !user.password || !user.email) {
            throw new BadRequestException('Please Provide all the required data : name, password and email');
        }

        // Check if a user with the provided email already exists
        const existingUser = await this.usersRepository.findOne({ where: { email: user.email } });
        if (existingUser) {
            throw new BadRequestException('User with this email already exists');
        }

        // Hash the password before saving the user with salt factor 10
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = { ...user, password: hashedPassword };

        return this.usersRepository.save(newUser);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.createQueryBuilder('user')
            .select(['user.id', 'user.name', 'user.email'])
            .getMany();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.createQueryBuilder('user')
            .select(['user.id', 'user.name', 'user.email'])
            .where({ id })
            .getOne();

        if (!user) {
            throw new UserNotFoundException(id);
        }

        return user;
    }

    async update(id: number, user: User): Promise<{ message: String }> {

        /*  checking Authorization  */
        if (user.id !== id) {
            throw new UnauthorizedException('You are not authorized to delete this User');
        }

        /* if user is trying to update the email we would like to make sure that email does not exist. */
        if (user.email) {
            // Check if a user with the provided email already exists
            const existingUser = await this.usersRepository.findOne({ where: { email: user.email } });
            if (existingUser && existingUser.id != id) {
                throw new BadRequestException('User with this email already exists');
            }
        }

        const updateResult = await this.usersRepository.update(id, user);

        /* if no user found */
        if (updateResult.affected === 0) {
            throw new UserNotFoundException(id);
        }

        return { message: "Updation successful" }
    }

    async remove(id: number, data: { userId: Number }): Promise<{ message: String }> {

        const user = await this.usersRepository.createQueryBuilder('user')
            .select(['user.id', 'user.name', 'user.email'])
            .where({ id })
            .getOne();

        if (!user) {
            throw new UserNotFoundException(id);
        }

        /*  checking Authorization */
        if (user.id !== data.userId) {
            throw new UnauthorizedException('You are not authorized to delete this User');
        }

        const deleteResult = await this.usersRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new UserNotFoundException(id);
        }

        return { message: "Deletion successful" }
    }
}

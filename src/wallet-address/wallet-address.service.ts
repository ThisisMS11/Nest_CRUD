import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletAddress } from './wallet-address.entity';
import { User } from '../users/user.entity';
import { WalletAddressNotFoundException, UserNotFoundException } from '../common/exceptions/not-found.exception';

@Injectable()
export class WalletAddressService {
    constructor(
        @InjectRepository(WalletAddress)
        private readonly walletAddressRepository: Repository<WalletAddress>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async create(walletAddress: WalletAddress): Promise<WalletAddress> {

        console.log(walletAddress.user);

        // Check if required attributes are present
        if (!walletAddress.user || !walletAddress.address) {
            throw new BadRequestException('Please Provide all the required data : userId and Wallet Address');
        }

        const user = await this.usersRepository.createQueryBuilder('user')
            .select(['user.id', 'user.name', 'user.email'])
            .where({ id: walletAddress.user })
            .getOne();

        if (!user) {
            //@ts-ignore
            throw new UserNotFoundException(walletAddress.user);
        }
        return this.walletAddressRepository.save(walletAddress);
    }

    findAll(): Promise<WalletAddress[]> {
        return this.walletAddressRepository.createQueryBuilder('wallet')
            .leftJoinAndSelect('wallet.user', 'user') // Populating user data
            .select(['wallet.id', 'wallet.address', 'user.id', 'user.name', 'user.email'])
            .getMany();
    }

    async findOne(id: number): Promise<WalletAddress> {
        const walletAddress = await this.walletAddressRepository.createQueryBuilder('wallet')
            .leftJoinAndSelect('wallet.user', 'user') // Populating user data
            .select(['wallet.id', 'wallet.address', 'user.id', 'user.name', 'user.email'])
            .where('wallet.id = :id', { id })
            .getOne();

        if (!walletAddress) {
            throw new WalletAddressNotFoundException(id);
        }

        return walletAddress;
    }

    async update(id: number, walletAddress: WalletAddress): Promise<{ message: String }> {
        // Retrieve the existing wallet address from the database
        const existingWalletAddress = await this.walletAddressRepository.createQueryBuilder('wallet')
            .leftJoinAndSelect('wallet.user', 'user') // Populating user data
            .select(['wallet.id', 'wallet.address', 'user.id',])
            .where('wallet.id = :id', { id })
            .getOne();

        // Check if the wallet address exists
        if (!existingWalletAddress) {
            throw new WalletAddressNotFoundException(id);
        }

        // Check if the user of the provided wallet address matches the user of the existing wallet address
        // @ts-ignore
        if (existingWalletAddress.user.id !== walletAddress.user) {
            throw new UnauthorizedException('You are not authorized to update this wallet address');
        }

        // Perform the update operation
        const updateResult = await this.walletAddressRepository.update(id, walletAddress);

        // Check if the update operation affected any rows
        if (updateResult.affected === 0) {
            throw new WalletAddressNotFoundException(id);
        }

        return { message: "Updation Successful" };
    }

    async remove(id: number, data: { userId: Number }): Promise<{ message: String }> {

        // Retrieve the existing wallet address from the database
        const existingWalletAddress = await this.walletAddressRepository.createQueryBuilder('wallet')
            .leftJoinAndSelect('wallet.user', 'user') // Populating user data
            .select(['wallet.id', 'wallet.address', 'user.id',])
            .where('wallet.id = :id', { id })
            .getOne();

        // Check if the wallet address exists
        if (!existingWalletAddress) {
            throw new WalletAddressNotFoundException(id);
        }

        // Check if the user of the provided wallet address matches the user of the existing wallet address
        // @ts-ignore
        if (existingWalletAddress.user.id !== data.userId) {
            throw new UnauthorizedException('You are not authorized to delete this wallet address');
        }

        const deleteResult = await this.walletAddressRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new WalletAddressNotFoundException(id);
        }

        return { message: "Deletion Successful" };
    }
}

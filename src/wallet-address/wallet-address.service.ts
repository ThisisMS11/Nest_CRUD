import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletAddress } from './wallet-address.entity';

@Injectable()
export class WalletAddressService {
    constructor(
        @InjectRepository(WalletAddress)
        private walletAddressRepository: Repository<WalletAddress>,
    ) { }

    create(walletAddress: WalletAddress): Promise<WalletAddress> {
        return this.walletAddressRepository.save(walletAddress);
    }

    findAll(): Promise<WalletAddress[]> {
        return this.walletAddressRepository.find();
    }

    findOne(id: number): Promise<WalletAddress> {
        return this.walletAddressRepository.findOne({ where: { id } });
    }

    async update(id: number, walletAddress: WalletAddress): Promise<void> {
        await this.walletAddressRepository.update(id, walletAddress);
    }

    async remove(id: number): Promise<void> {
        await this.walletAddressRepository.delete(id);
    }
}

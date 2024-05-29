import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
    constructor(userId: number) {
        super(`User with ID ${userId} not found`);
    }
}

export class WalletAddressNotFoundException extends NotFoundException {
    constructor(walletAddressId: number) {
        super(`Wallet Address with ID ${walletAddressId} not found`);
    }
}
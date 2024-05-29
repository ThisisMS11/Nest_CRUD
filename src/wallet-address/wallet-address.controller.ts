import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { WalletAddress } from './wallet-address.entity';

@Controller('wallet-address')
export class WalletAddressController {
    constructor(private readonly walletAddressService: WalletAddressService) { }

    /* to create a new wallet address*/
    @Post()
    create(@Body() walletAddress: WalletAddress) {
        return this.walletAddressService.create(walletAddress);
    }

    /* to find all the wallet Addresses */
    @Get()
    findAll() {
        return this.walletAddressService.findAll();
    }

    /* to get a specific wallet address info using id */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.walletAddressService.findOne(+id);
    }

    /* to update a specific wallet address information */
    @Patch(':id')
    update(@Param('id') id: string, @Body() walletAddress: WalletAddress) {
        return this.walletAddressService.update(+id, walletAddress);
    }

    /* to delete a specific wallet address from the db */
    @Delete(':id')
    remove(@Param('id') id: string, @Body() data: { userId: Number }) {
        return this.walletAddressService.remove(+id, data);
    }
}

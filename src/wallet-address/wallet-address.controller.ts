import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { WalletAddress } from './wallet-address.entity';

@Controller('wallet-address')
export class WalletAddressController {
    constructor(private readonly walletAddressService: WalletAddressService) { }

    @Post()
    create(@Body() walletAddress: WalletAddress) {
        return this.walletAddressService.create(walletAddress);
    }

    @Get()
    findAll() {
        return this.walletAddressService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.walletAddressService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() walletAddress: WalletAddress) {
        return this.walletAddressService.update(+id, walletAddress);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.walletAddressService.remove(+id);
    }
}

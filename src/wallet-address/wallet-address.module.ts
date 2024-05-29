import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletAddress } from './wallet-address.entity';
import { User } from '../users/user.entity';
import { WalletAddressService } from './wallet-address.service';
import { WalletAddressController } from './wallet-address.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WalletAddress,User])],
  providers: [WalletAddressService],
  controllers: [WalletAddressController],
  exports: [WalletAddressService],
})
export class WalletAddressModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WalletAddressModule } from './wallet-address/wallet-address.module';
import { User } from './users/user.entity';
import { WalletAddress } from './wallet-address/wallet-address.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'cutoff_user',
      password: 'cutoff',
      database: 'cutoff',
      entities: [User, WalletAddress],
      synchronize: true,
    }),
    UsersModule,
    WalletAddressModule,
  ],
})
export class AppModule { }

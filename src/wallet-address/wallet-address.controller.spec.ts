import { Test, TestingModule } from '@nestjs/testing';
import { WalletAddressController } from './wallet-address.controller';

describe('WalletAddressController', () => {
  let controller: WalletAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletAddressController],
    }).compile();

    controller = module.get<WalletAddressController>(WalletAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

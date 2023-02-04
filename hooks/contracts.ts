import { contractHooksFactory } from '../sdk/factories';
import { getPerpetualStorageBountiesAddress } from 'config';
import { PerpetualStorageBountiesAbi__factory } from 'generated';


const perpetualStorage = contractHooksFactory(PerpetualStorageBountiesAbi__factory, (chainId) =>
  getPerpetualStorageBountiesAddress(chainId),
);

export const usePerpetualStorageBountiesRPC = perpetualStorage.useContractRPC;
export const usePerpetualStorageBountiesWeb3 = perpetualStorage.useContractWeb3;
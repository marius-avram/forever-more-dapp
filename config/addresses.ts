import { CHAINS } from '../sdk/constants';

export const PERPETUAL_STORAGE_BOUNTIES_BY_NETWORK: {
  [key in CHAINS]: string;
} = {
  [CHAINS.FilecoinMainnet]: 'undeployed',
  [CHAINS.Wallaby]: 'undeployed',
  [CHAINS.Hyperspace]: '0xA2A25fBBd987B2d1e7Ec4Ffe37ACedBDE6b49Da9',
};

export const getPerpetualStorageBountiesAddress = (chainId: CHAINS): string => {
  return PERPETUAL_STORAGE_BOUNTIES_BY_NETWORK[chainId];
};

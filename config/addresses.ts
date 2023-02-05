import { CHAINS } from '../sdk/constants';

export const PERPETUAL_STORAGE_BOUNTIES_BY_NETWORK: {
  [key in CHAINS]: string;
} = {
  [CHAINS.FilecoinMainnet]: 'undeployed',
  [CHAINS.Wallaby]: 'undeployed',
  [CHAINS.Hyperspace]: '0x0aA7309C29a937dDf81E0E0aF8175d43519be9ef',
};

export const getPerpetualStorageBountiesAddress = (chainId: CHAINS): string => {
  return PERPETUAL_STORAGE_BOUNTIES_BY_NETWORK[chainId];
};

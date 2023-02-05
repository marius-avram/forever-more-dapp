import FormatToken from "components/formatToken";
import { Wallet } from "components/ui";
import { usePerpetualStorageBountiesRPC } from "hooks";
import { useEffect } from "react";
import { useSDK } from "sdk/hooks";
import { useContractSWR } from "sdk/hooks/useContractSWR";
import { WalletSectionWrapper, WalletWrapperStyles, WalledBalanceLoaderStyle, WalletBalanceStyles } from "./BountyCreateStyles";

export default function FundsLocked() {
  const contractRPC = usePerpetualStorageBountiesRPC();
  const { account } = useSDK();

  const {data: fundsLocked, initialLoading: fundsLockedLoading} = useContractSWR({
    contract: contractRPC,
    method: 'getFundsLocked',
    params: [account]
  });

  return (
    <WalletSectionWrapper>
      <WalletWrapperStyles>
        <span>Available amount in contract:&nbsp;</span>
        <Wallet />
          {fundsLockedLoading ? <WalledBalanceLoaderStyle /> :
        (<WalletBalanceStyles>
          <FormatToken amount={fundsLocked} symbol="FIL" />
        </WalletBalanceStyles>)}
      </WalletWrapperStyles>
    </WalletSectionWrapper>
  );
}
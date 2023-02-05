import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";

import StackedBlock from "components/stackedBlock";
import { Button, Input } from "components/ui";
import { ButtonWrapper, InputWrapper } from "pages/bounties/create/BountyCreateStyles";
import { CID } from 'multiformats/cid'
import { base16 } from 'multiformats/bases/base16';
import { getMaxPriorityFee } from "hooks/maxPriorityFee";
import { usePerpetualStorageBountiesWeb3 } from "hooks";

interface AddDealProps {
  cid?: string,
  bountyId?: string
}

export default function AddDeal(props: AddDealProps) {
  const [dealId, setDealId] = useState<string>('');
  const contractWeb3 = usePerpetualStorageBountiesWeb3();
  
  const handleInputChange = (setter: Function) => (event: ChangeEvent<HTMLInputElement>) : void => {
    setter(event.currentTarget.value);
  }
  
  const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = async (
    event: FormEvent,
  ) => {
    event.preventDefault();
    contractWeb3!.claimBounty(props.bountyId!, Number(dealId), {
      gasLimit: 1000000000,
      maxPriorityFeePerGas: getMaxPriorityFee()
    });
  }

  return (
    <StackedBlock>
      <form action="" method="post" onSubmit={handleSubmit}>
        <InputWrapper key="dealId-wrapper">
          <Input
            id="cid"
            value={dealId}
            fullwidth
            onChange={handleInputChange(setDealId)}
            placeholder="Deal id"
            label={"Deal ID for CID" + props.cid}
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button fullwidth color="success" type="submit">
            Submit
          </Button>
        </ButtonWrapper>
      </form>
    </StackedBlock>
  )
}

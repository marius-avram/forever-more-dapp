import { FormEventHandler, FormEvent, useState, useEffect, ChangeEvent } from 'react';
import { useWeb3 } from 'sdk/web3-react';
import { useFilecoinBalance, useSDK } from 'sdk/hooks';
import { CID } from 'multiformats/cid'
import { base16 } from 'multiformats/bases/base16';
import { useContractSWR } from 'sdk/hooks/useContractSWR';
import { usePerpetualStorageBountiesRPC, usePerpetualStorageBountiesWeb3, useModal } from '../../../hooks';
import StackedBlock from 'components/stackedBlock';
import { ButtonWrapper, CreateBountyTitle, DecoratorLabelStyle, HalfColumn, InputWrapper, WalledBalanceLoaderStyle, WalletBalanceStyles, WalletSectionWrapper, WalletWrapperStyles } from './BountyCreateStyles';
import { Button, Clfil, Fil, Input, Wallet } from 'components/ui';
import { MODAL } from 'providers';
import SliderInput from 'components/ui/input/SliderInput';
import { InputLabelStyle } from 'components/ui/input/LabelStyles';
import FormatToken from 'components/formatToken';
import { BigNumber } from 'ethers';
import BountyRequiredFunds from './BountyRequiredFunds';
import FundsLocked from './FundsLocked';
import { getMaxPriorityFee } from 'hooks/maxPriorityFee';
import IconBxInfoCircle from 'components/infoCircleBadge/IconBxInfoCircle';
import ForeverMoreInfo from '../info/ForeverMoreInfo';


export default function BountyCreate() {
  const [shouldDisplayInfo, setShouldDisplayInfo] = useState<boolean>(false);
  const [cid, setCid] = useState<string>();
  const [size, setSize] = useState<number>(262144);
  const [replicas, setReplicas] = useState<number>(3);
  const [period, setPeriod] = useState<number>(180);
  const [shouldFund, setShouldFund] = useState<boolean>(false);
  const [displayRequiredFunds, setDisplayRequiredFunds] = useState<boolean>(false);
  const contractRPC = usePerpetualStorageBountiesRPC();
  const contractWeb3 = usePerpetualStorageBountiesWeb3();
  const { active } = useWeb3();
  const { account } = useSDK();

  const { openModal } = useModal(MODAL.connect);
  const { data: balance, initialLoading: balanceLoading } = useFilecoinBalance();

  const handleInputChange = (setter: Function) => (event: ChangeEvent<HTMLInputElement>) : void => {
    setter(event.currentTarget.value);
  }
  
  const handleDisplayRequiredFunds = () : void => {
    console.log("handleDisplayRequiredFunds");
    if (displayRequiredFunds == true) {
      setShouldFund(true);
    }
    setDisplayRequiredFunds(true);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = async (
    event: FormEvent,
  ) => {
    event.preventDefault();
    console.log("Add Bounty");
    if (account != null && cid != null && contractWeb3 != null) {
      const cidObj = CID.parse(cid);
      const cidBase16 = cidObj.toString(base16).substring(1)
      const cidHex = "0x00" + cidBase16;
      console.log("bytes are=" + cidHex)
      contractWeb3.addBounty(account, cidHex, cid, size, replicas, period, {
        gasLimit: 1000000000,
        maxPriorityFeePerGas: getMaxPriorityFee()
      });
    }
  };

  return (
    <StackedBlock>
      <form action="" method="post" onSubmit={handleSubmit}>
        <CreateBountyTitle>
          Create new bounty&nbsp;
          <IconBxInfoCircle onClick={() => setShouldDisplayInfo(!shouldDisplayInfo)}/>
        </CreateBountyTitle>
        {active && (account != null) && <FundsLocked />}
        {shouldDisplayInfo && <ForeverMoreInfo />}
        <InputWrapper key="cid-wrapper">
          <Input
            id="cid"
            value={cid}
            fullwidth
            onChange={handleInputChange(setCid)}
            placeholder="e.g: baga6ea4seaqjw6s3hpx4bxisfi55klyp7wvr24lhepwzwknhjqlsu5pnetwtqeq"
            label="Piece CID"
          />
        </InputWrapper>
        <InputWrapper key="size-wrapper">
          <Input
            id="size"
            value={size}
            fullwidth
            type="number"
            min="1"
            onChange={handleInputChange(setSize)}
            placeholder="bytes size"
            label="size"
            rightDecorator="bytes"
          />
        </InputWrapper>
        <InputWrapper key="replicas-wrapper">
          <InputLabelStyle $color="default">Desired replicas</InputLabelStyle>
          <SliderInput
            id="replicas"
            value={replicas}
            type="number"
            onChange={handleInputChange(setReplicas)}
            placeholder="replicas"
            min={1}
            max={10}
            getLabel={(num) => num}
            rightDecorator={(replicas == 1) ? "replica" : "replicas"}
          />
        </InputWrapper>
        <InputWrapper key="period-wrapper">
          <Input
            id="period"
            value={period}
            fullwidth
            type="number"
            min="180"
            onChange={handleInputChange(setPeriod)}
            placeholder="bytes size"
            label="Base lease period"
            rightDecorator={"days"}
          />
        </InputWrapper>
        <ButtonWrapper>
          <HalfColumn>
            <Button 
              fullwidth
              color="secondary"
              type="button"
              onClick={handleDisplayRequiredFunds}
            >
              { displayRequiredFunds ? 
                <BountyRequiredFunds replicas={replicas} period={period} fund={shouldFund} /> :
                <span>Inquire required funds</span>
              }
            </Button>
          </HalfColumn>
          <HalfColumn>{active ? (
              <Button fullwidth color="success" type="submit">
              Submit
            </Button>
            ) : (
            <Button fullwidth color="success" type="button" onClick={openModal}>
              Connect Wallet
            </Button>
            )}
          </HalfColumn>
        </ButtonWrapper>
      </form>
    </StackedBlock>
  );
}

import { usePerpetualStorageBountiesRPC, usePerpetualStorageBountiesWeb3 } from "hooks";
import { useEffect, useState } from "react";
import { useContractSWR } from "sdk/hooks/useContractSWR";
import { formatBalance, stringToEther } from "utils";

interface ComputeRequiredFundsProps {
  replicas: number;
  period: number;
  fund: boolean;
}

export default function BountyRequiredFunds(props: ComputeRequiredFundsProps) {
  const contractRPC = usePerpetualStorageBountiesRPC();
  const contractWeb3 = usePerpetualStorageBountiesWeb3();

  const [funded, setFunded] = useState<boolean>(false);
  const [prefundStats, setPrefundStatus] = useState<string>('');

  const {data: requiredFunds, initialLoading} = useContractSWR({
    contract: contractRPC,
    method: 'computeRequiredFunds',
    params: [props.replicas, props.period]
  });

  useEffect(() => {
    console.log(formatBalance(requiredFunds));
    if (props.fund == true && funded == false) {
      setFunded(true);
      setPrefundStatus('Prefund processing...')
      contractWeb3?.preFund({value: requiredFunds}).then(
        () => {
          // on fullfilment
          setPrefundStatus('Prefund submited')
        },
        () => {
          // on failed
          setPrefundStatus('Prefund failed!')
        }
      )

    }
  }, [requiredFunds, props.fund, funded])

  return (
    <div>
      {initialLoading ? <span>Computing...</span> : 
        <span>
          { !funded ?
            <>
            Estimated {formatBalance(requiredFunds)} FIL&nbsp;
            <a href="/" target="_blank" rel="noreferrer">(Prefund)</a>
            </> : 
            <>{prefundStats}</>
          }
        </span>
      }
    </div>
  );
}
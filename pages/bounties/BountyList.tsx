import { useWeb3 } from 'sdk/web3-react';
import { useSDK } from 'sdk/hooks';

import { useContractSWR } from 'sdk/hooks/useContractSWR';
import { usePerpetualStorageBountiesRPC, usePerpetualStorageBountiesWeb3, useModal } from '../../hooks';
import { useEffect } from 'react';
import { BountyListStyles, BountyListTable } from './BountyListStyles';


export default function BountyList() {
    const contractRPC = usePerpetualStorageBountiesRPC();
    const contractWeb3 = usePerpetualStorageBountiesWeb3();
    const { active } = useWeb3();
    const { account } = useSDK();
  
    const {data: bountyList, initialLoading} = useContractSWR({
      contract: contractRPC,
      method: 'getBounties',
      params: []
    });

    useEffect(() => {
        console.log(BountyList);
    }, [bountyList])

    return (
        <>
            <BountyListStyles>
                <h1>File bounties list</h1>
                {initialLoading ?
                    <span>Waiting for bounty list...</span> : 
                    <BountyListTable>
                        <tr>
                            <td>File CID</td>
                            <td>File size</td>
                            <td>Replicas</td>
                            <td>Storage period</td>
                        </tr>
                        {bountyList?.map(bountyItem => (
                            <tr>
                                <td>{String(bountyItem.cidReadable)}</td>
                                <td>{String(bountyItem.cidSize)}</td>
                                <td>{String(bountyItem.desiredReplicas)}</td>
                                <td>{String(bountyItem.desiredStoragePeriod)}</td>
                            </tr>
                        ))}
                    </BountyListTable>}
            </BountyListStyles>
        </>
        
    );
}
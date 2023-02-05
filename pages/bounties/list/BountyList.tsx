import { useWeb3 } from 'sdk/web3-react';
import { useSDK } from 'sdk/hooks';

import { useContractSWR } from 'sdk/hooks/useContractSWR';
import { usePerpetualStorageBountiesRPC, usePerpetualStorageBountiesWeb3, useModal } from '../../../hooks';
import { useEffect, useState } from 'react';
import { BountyListStyles, BountyListTable } from './BountyListStyles';
import { randomInt } from 'crypto';
import AddDeal from 'pages/deals/add/AddDeal';


export default function BountyList() {
  const [selectedBountyId, setSelectedBountyId] = useState<string>();
  const [selectedCid, setSelectedCid] = useState<string>();
  const contractRPC = usePerpetualStorageBountiesRPC();
  const contractWeb3 = usePerpetualStorageBountiesWeb3();
  const { active } = useWeb3();
  const { account } = useSDK();

  const {data: bountyList, initialLoading} = useContractSWR({
    contract: contractRPC,
    method: 'getBounties',
    params: []
  });

  const displayAddDeal = (currentBountyId: string, currentCid: string) => () => {
    setSelectedBountyId(currentBountyId);
    setSelectedCid(currentCid);
  }

  return (
    <>
      <BountyListStyles>
        <h1>File bounties list</h1>
          {initialLoading ?
            <span>Waiting for bounty list...</span> : 
            <BountyListTable>
              <thead>
                <tr>
                  <td>File CID</td>
                  <td>File size</td>
                  <td>Replicas</td>
                  <td>Storage period</td>
                </tr>
              </thead>
              <tbody>
                {bountyList?.map(bountyItem => (
                  <tr
                    style={{cursor: "pointer"}}
                    onClick={displayAddDeal(bountyItem.id, bountyItem.cidReadable)} 
                    key={bountyItem.id}
                  >
                    <td>{String(bountyItem.cidReadable)}</td>
                    <td>{String(bountyItem.cidSize)}</td>
                    <td>{String(bountyItem.storedReplicas)}/{String(bountyItem.desiredReplicas)}</td>
                    <td>{String(bountyItem.desiredStoragePeriod)}</td>
                  </tr>
                ))}
              </tbody>
            </BountyListTable>}
          {selectedBountyId && <AddDeal bountyId={selectedBountyId} cid={selectedCid}/>}
      </BountyListStyles>
    </>
  );
}
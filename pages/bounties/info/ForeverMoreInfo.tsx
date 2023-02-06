import { InfoWrapper } from "./ForeverMoreStyles";

export default function ForeverMoreInfo() {
  return (
    <InfoWrapper>
      <p>ForeverMore is a dApp that can be used as a 
        starting point for a DAO operating on the Filecoin network.
      </p>

      <p>
        The objective of the smart contract, called by this web app, is to manage the deals between two actors:
      <ul style={{marginLeft: '40px'}}>
        <li>
          simple users of the network, that want to store some files
        </li>
        <li>
          service providers that offer up their space in exchange of currency
        </li>
      </ul>
      </p>
      <p>
        At the same time the app aims to allow its users the option to store in a convenient way files, that are replicated over the network at any point in time. While for the storage providers it aims to provide a steady source of income from new storage bounties.

      </p>
      
      <p>
        In current verion the basic user can create a storage deal offer/bounty for a file based on its CID. For each bounty he can
        select:
        <ul  style={{marginLeft: '40px'}}>
          <li>
            the desired amount of replicas that he wants to achive on the filecoin network
          </li>
          <li>
            the minimum storage period desired for each replica
          </li>
        </ul>
      </p>
    
      <p>
        Once the storage period for a replica has passed/expired it will try to make a new replica in the network for the same storage period that was first defined at the creation of the bounty. That will happen only if there are storage providers on the network willing to still take up the offer, and if the user that initiated the storage bounty has enough funds deposited in the contract.
      </p>
    </InfoWrapper>
  );
}
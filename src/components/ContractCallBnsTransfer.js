import { useConnect } from '@stacks/connect-react';
import { useState } from 'react';
import { StacksMainnet } from '@stacks/network';
import {} from '@stacks/bns';
import {
  AnchorMode,
  PostConditionMode,
  bufferCVFromString,
  standardPrincipalCV,
  noneCV,
} from '@stacks/transactions';
import { userSession } from './ConnectWallet';

const ContractCallBnsTransfer = () => {
  const { doContractCall } = useConnect();

  // useState
  const [stxAddress, setStxAddress] = useState('');
  const [namespace, setNamespace] = useState('');
  const [bnsName, setBnsName] = useState('');

  function transferBnsName() {
    doContractCall({
      network: new StacksMainnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: 'SP000000000000000000002Q6VF78',
      contractName: 'bns',
      functionName: 'name-transfer',

      functionArgs: [
        bufferCVFromString(namespace),
        bufferCVFromString(bnsName),
        standardPrincipalCV(stxAddress),
        noneCV(),
      ],

      postConditionMode: PostConditionMode.Allow,
      postConditions: [],

      onFinish: (data) => {
        console.log('onFinish:', data); //writes to console
        window //opens a new window, show transaction in Stacks Explorer
          .open(
            `https://explorer.stacks.co/txid/${data.txId}?chain=mainnet`,
            '_blank'
          )
          .focus();
      },
      onCancel: () => {
        console.log('onCancel:', 'Transaction was canceled');
      },
    });
  }

  if (!userSession.isUserSignedIn()) {
    return;
  }

  return (
    <div>
      <p>Account address of new owner:</p>
      <input
        type="text"
        size="60"
        onChange={(e) => setStxAddress(e.target.value)}
      />
      <p>Namespace (btc, id, fren, mega, etc.):</p>
      <input
        type="text"
        size="15"
        onChange={(e) => setNamespace(e.target.value)}
      />

      <p>BNS Name (do not include namespace):</p>
      <input
        type="text"
        size="40"
        onChange={(e) => setBnsName(e.target.value)}
      />
      <p>
        <i>Enter all three info above, then click on 'Transfer BNS Name'</i>
      </p>
      <button className="Connect" onClick={() => transferBnsName()}>
        Transfer BNS Name
      </button>
    </div>
  );
};

export default ContractCallBnsTransfer;

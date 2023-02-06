import { FormEventHandler, FormEvent, FC, ChangeEventHandler, ChangeEvent, MouseEvent } from 'react';
import Layout from 'components/layout';
import StackedBlock from 'components/stackedBlock';
import ConnectionError from 'components/connectionError'
import Head from 'next/head';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { trackEvent, MatomoEventType } from '@lidofinance/analytics-matomo';
import { Input, Button, Fil, Clfil, Wallet, InlineLoader } from '../components/ui';
import { useContractSWR } from 'sdk/hooks/useContractSWR';
import { useModal } from '../hooks';
import { useWeb3 } from 'sdk/web3-react';
import { useFilecoinBalance, useSDK } from 'sdk/hooks';
import FormatToken from 'components/formatToken';
import { formatBalance, stringToEther } from '../utils';
import { MODAL } from '../providers';
import BountyList from './bounties/list/BountyList';
import BountyCreate from './bounties/create/BountyCreate';

export default function Home() {
  const [value, setValue] = useState('');
  const { active } = useWeb3();
  const { account } = useSDK();
  const { data: balance, initialLoading } = useFilecoinBalance();

  return (
    <Layout>
      <Head>
        <title>Forever more - Filecoin automated deal broker</title>
      </Head>
      <ConnectionError />
      <BountyCreate />
      <BountyList />
    </Layout>
    
  );
}

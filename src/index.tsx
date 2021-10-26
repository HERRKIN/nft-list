import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
import { ConnectSample } from 'components/ConnectSample';
import { QuerySample } from 'components/QuerySample';
import { SignSample } from 'components/SignSample';
import { TxSample } from 'components/TxSample';
// import SingleNFT  from 'components/singleNFT/SingleNFT';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import NFTList from 'components/NFTList/NFTList';

function App() {
  return (
    <main
      style={{ margin: 20, display: 'flex', flexDirection: 'column', gap: 40 }}
    >
      <ConnectSample />
      {/* <QuerySample /> */}
      {/* <TxSample /> */}
      {/* <SignSample /> */}
      <NFTList/>
      
    </main>
  );
}

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <App />
    </WalletProvider>,
    document.getElementById('root'),
  );
});

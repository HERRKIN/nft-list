import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import React, { useState } from 'react';

export function ConnectSample() {
  const {
    status,
    network,
    wallets,
    availableConnectTypes,
    availableInstallTypes,
    connect,
    install,
    disconnect,
  } = useWallet();

  const [show, setShow] = useState(false)

  return (
    <header>
      <button className="dev-button" 
      onClick={()=>setShow(!show)}
      >
        Connect Wallet
      </button>
      {show && 
        <div className="login-wallet">
          {status === WalletStatus.WALLET_NOT_CONNECTED && (
            <>
              {availableInstallTypes.map((connectType) => (
                <button
                className="dev-button"
                  key={'install-' + connectType}
                  onClick={() => install(connectType)}
                >
                  Install Terra Station
                </button>
              ))}
              {availableConnectTypes.map((connectType) => (
                <button
                className="dev-button"
                  key={'connect-' + connectType}
                  onClick={() => connect(connectType)}
                >
                  {connectType}
                </button>
              ))}
            </>
          )}
          {status === WalletStatus.WALLET_CONNECTED && (
            <button className="dev-button logout" onClick={() => disconnect()}>Disconnect</button>
          )}
        </div>
      }
    </header>
  );
}

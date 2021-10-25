
import PropTypes from "prop-types";
import React, {useMemo, useEffect, useState } from 'react'
import SingleNFT  from 'components/singleNFT/SingleNFT';
import { useConnectedWallet, ConnectedWallet } from '@terra-money/wallet-provider';
import { LCDClient, Wallet, WasmAPI } from '@terra-money/terra.js';
import "./style.css"

// type NFTListT ={
//   // nftItem: any;

// }
const NFTList = () : JSX.Element =>{
  const connectedWallet = useConnectedWallet();
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  console.log(Boolean(connectedWallet))
  const lcd = useMemo(() => {
    if (!connectedWallet) {
      return null;
    }

    return new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    });
  }, [connectedWallet]);

  useEffect(() => {
    if (connectedWallet && lcd) {
      setLoading(true)
      fetchNFTS(lcd.wasm, connectedWallet).then((result: any) => {
        setList(result )
        setLoading(false)
      })

    } else {
      setList([]);
    }
  }, [connectedWallet, lcd]);

  if(!connectedWallet) return <div><h1>please connect to see your nfts</h1></div>
console.log(list)
 if(loading) return <h1>Loading...</h1>

  return (
    <div  className="nft_list">
  {list.length > 0 ? list.map((nft: any) => (
      <SingleNFT
        nftImage={nft.image}
        nftTitle={nft.name}
        nftId={nft.token_id}
        nftPriceFiat="10" 
        nftPriceCrypto="0.1"
        key={nft.token_id}
       />
    )
  ): <h1>you don't have any nft</h1>}
    </div>
  )
}
 
export default NFTList

const fetchNFTS = async (wasm: WasmAPI, wallet: ConnectedWallet) =>{
  console.log(wallet, wasm)
  const contract = "terra1er46zkkqu4fvjdkh6pyw3hprm68c7sdu9yt3e5"
  const results:any = await wasm.contractQuery(contract, {"tokens":{"owner":wallet.walletAddress,"limit":30}}) 
  if(results.tokens.length === 0) return []
  const nftpromises = results.tokens.map( (token: String) => wasm.contractQuery(contract, {"nft_additional_info":{"token_id":token}})) 
  const nfts = await Promise.all(nftpromises) 
  return nfts 
}
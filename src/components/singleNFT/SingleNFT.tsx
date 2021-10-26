
import PropTypes from "prop-types";
import "./style.scss"

type SingleNFTT ={
  nftImage: string,
  nftTitle: string,
  nftId: string,
  nftPriceFiat: string,
  nftPriceCrypto: string,

}
const SingleNFT = ({
nftImage,
nftTitle,
nftId,
nftPriceFiat,
nftPriceCrypto,
}: SingleNFTT) =>{

  return (
      <div className="nft_card">
        <img className="nft_image"src={nftImage}/>
        <div className="nft_info">
          <p className="nft_title">{nftTitle}</p>
          <p className="nft_id">{nftId}</p>
          <div className="nft_prices">
            <p className="nft_prices-fiat">USD {nftPriceFiat}</p>
            <p className="nft_prices-crypto">{nftPriceCrypto} LUNA</p>
          </div>
        </div>
      </div>
  );
}
 
export default SingleNFT


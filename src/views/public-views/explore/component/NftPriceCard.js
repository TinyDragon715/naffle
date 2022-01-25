import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";

import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import Swal from "sweetalert2";
import RaffleConfig from 'contract';
import "../css/NftPriceCard.css";
import { Card, Row } from "antd";
import { ExploreImage } from "constant/ImageConstant";
import { Link } from "react-router-dom";
import { PUBLIC_PREFIX_PATH } from "config/AppConfig";
import { CURRENT_NETWORK } from "config/NetConfig";
import { object2string, eth2number } from "utils/utils";
import { storeNFT } from "actions/nft";
import { connect } from "react-redux";
const truncate = (str) => {
  return str.substr(0, 6) + "..." + str.substr(str.length - 4, str.length - 1);
}
const SetInit = (props) => {

  const { data } = props;
  return (
    <>
      <Link to={`/${PUBLIC_PREFIX_PATH}/itemlist?address=${data.metaData.owner_of}`}>
        <Card
          hoverable
          style={{ width: 380 }}
          className="NftPriceCard FourGrid"
          cover={<img alt="example" className="NftPriceImg" src={data.metaData.token_uri} />}
        >
          <Row className="CollectionContract">
            <span className="NftCollectionName">{data.metaData.name}</span>
            <span className="Shortcard-text">
              {truncate(data.metaData.owner_of)}
            </span>
            <div className="SlideStatusBar">
              <div className="SystemLeftStatus">
                <span className="ShortColText">Floor</span>
                {/* <span className="ShortColLeft"><img alt="" className="PriceImg" src={ExploreImage.NftPriceCard.EyeImg} />{eth2number(data.contractData.price)}</span> */}
                <div className="explore-price-row">
                  <span className="ShortColLeft">
                    <img
                      alt=""
                      className="PriceImg"
                      src={ExploreImage.NftPriceCard.EyeImg}
                    />{" "}
                    2.69
                  <span className="usd-price">( $7,387 )</span>
                  </span>
                </div>
              </div>
              <span className="Split"></span>
              <div className="SystemPriceStautsRead">
                <span className="SystemShortColText">TICKETS FROM</span>
                <span className="PriceEthH">
                  {/* <span className="EthPrice"><img alt="" className="PriceImg" src={ExploreImage.NftPriceCard.EyeImg} />{eth2number(data.contractData.ticketPrice)}</span> */}
                  <span className="EthPrice">
                    <img
                      alt=""
                      className="PriceImg"
                      src={ExploreImage.NftPriceCard.EyeImg}
                    />{" "}
                    {eth2number(data.contractData.ticketPrice)}
                  </span>
                  <span className="usd-price">( $16 )</span>
                </span>
              </div>
            </div>
          </Row>
        </Card>
      </Link>
    </>
  );
};

const NftPriceCard = (props) => {
  const data = props.data;
  const { account, library } = useWeb3React();
  const { authenticate, enableWeb3, user } = useMoralis();
  Moralis.enableWeb3();
  const [nfts, setNFTs] = useState([]);
  const [metaDatas, setMetadatas] = useState([]);
  const options = { chain: 'rinkeby', address: account };

  const getAllNFTs = async () => {
    const callOption = {
      contractAddress: RaffleConfig.RaffleSystemAddress,
      functionName: "getAllNaffleNFTs",
      abi: RaffleConfig.RaffleSystemAbi,
      params: {}
    }
    try {
      Moralis.enableWeb3();
      const approvedAddress = await Moralis.executeFunction(callOption);
      return approvedAddress;
    }
    catch (err) {
      return '0x0000000000000000000000000000000000000000';
    }
  }

  const callGetTokenIdMetadata = async (nfts) => {
    const metadataBuffer = [];
    for (let i = 0; i < nfts.length; i++) {
      const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata({ address: nfts[i].nftAddress, token_id: nfts[i].nftTokenId, chain: CURRENT_NETWORK })
      metadataBuffer.push({
        contractData: nfts[i],
        metaData: tokenIdMetadata
      });
    }
    setMetadatas(metadataBuffer)
    props.storeNFT(metadataBuffer)
  }

  useEffect(async () => {
    if (account) {
      setNFTs(await getAllNFTs());
    }
  }, [])
  useEffect(async () => {
    callGetTokenIdMetadata(nfts);
  }, [nfts])
  return (
    <>
      {metaDatas.map((item, index) => {
        return <SetInit data={item} key={index} />;
      })}
    </>
  );
};

// export default NftPriceCard;
export default connect(null, {storeNFT})(NftPriceCard);

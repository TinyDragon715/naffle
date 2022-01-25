import React from "react";
import { useWeb3React } from "@web3-react/core";
import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import "../css/CardDetailCol.css";
import { ExploreImage } from "constant/ImageConstant";
import {Col,Collapse} from "antd";
import PropertyCard from "./PropertyCard";
import {PropertyData} from 'data/SingleCardData';
import RaffleConfig from "contract";

const { Panel } = Collapse;
function callback(key) {
    console.log(key);
  }
  const truncate = (str) => {
    return str.substr(0,6)+"..."+str.substr(str.length-4,str.length-1);
  }
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const CardDetailCol = (props) => {

  const {enableWeb3} = useMoralis();
  const pickCampaignData = () => {
    const callOption = {
      contractAddress: RaffleConfig.RaffleSystemAddress,
      functionName: "creatorToCampaign",
      params: {
      }
    }
  }

  return (
    <>
      <Col className="CardDetailCol">
        <img
        alt=""
          className="CardDetailImg"
          src={props.avatar}
        />{
          console.log("Token_", props)
        }
        <Collapse className="DetailCollapse" expandIconPosition="right" onChange={callback}>
          <Panel className="DetailContent" header="Description" key="1">
            <p>{text}</p>
          </Panel>
          <Panel className="DetailContent PropertyContent" header="Properties" key="2">
            {
              PropertyData.map((item,key)=>{
                return(
                  <PropertyCard data={item}/>
                )
              })
            }
          </Panel>
          {/* <Panel className="DetailContent" header="Creator wallet" key="3">
            <p>{text}</p>
          </Panel> */}
          <Panel className="DetailContent EndContent" header="DETAILS" key="4">
            <a target="_blank" href="https://opensea.io" rel="noreferrer" style={{
              color:"white"
            }}>
              <span>See this item on <span className="TextOpenSea">
                OPENSEA
                </span>
                </span>
            </a>
            <span className="RefferalListRow">
              <span>Seller Wallet</span>
              <span className="Split"></span>
              <span>{truncate('0x6777A0ffFAB9D9C4a94342F19F4e9e8f0b13F66f')}</span>
            </span>
            <span className="RefferalListRow">
              <span>Collection Creator</span>
              <span className="Split"></span>
              <span>{truncate('0x6777A0ffFAB9D9C4a94342F19F4e9e8f0b13F66f')}</span>
            </span>
            <span className="RefferalListRow">
              <span>Collection Contract</span>
              <span className="Split"></span>
              <span>{truncate('0x6777A0ffFAB9D9C4a94342F19F4e9e8f0b13F66f')}</span>
            </span>
            <span className="RefferalListRow">
              <span>TokenID</span>
              <span className="Split"></span>
              <span>2314</span>
            </span>
            <span className="RefferalListRow">
              <span>Token Standard</span>
              <span className="Split"></span>
              <span>ERC-721</span>
            </span>
            <span className="RefferalListRow">
              <span>Initial Mint Price</span>
              <span className="Split"></span>
              <span><img alt="" className="PriceImg" src={ExploreImage.NftPriceCard.EyeImg} />0.05</span>
            </span>
            <span className="RefferalListRow">
              <span>Current Floor Price</span>
              <span className="Split"></span>
              <span><img alt="" className="PriceImg" src={ExploreImage.NftPriceCard.EyeImg} />3.9</span>
            </span>
          </Panel>
        </Collapse>
      </Col>
    </>
  );
};

export default CardDetailCol;

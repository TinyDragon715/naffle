import React from "react";
import "../css/CollectionInfoBox.css";
import { Row } from "antd";
import { ExploreImage } from "constant/ImageConstant";

// import {CheckCircle} from 'react-bootstrap-icons'
// import { ExploreImage } from "constant/ImageConstant";
const truncate = (str) => {
  return str.substr(0, 6) + "..." + str.substr(str.length - 4, str.length - 1);
};
const CollectionInfoBox = () => {
  return (
    <>
      <Row className="CollectionInfoBox">
        <h2 className="InfoBoxLogo">World Wide Naffle</h2>
        <Row className="UpdateContract">
          {truncate("0x6777A0ffFAB9D9C4a94342F19F4e9e8f0b13F66f")}
        </Row>
        <Row className="OpenseaView" style={{marginBottom:"20px"}} justify="center" align="middle">
            View On 
            <span className="BoldText">
              OPENSEA
              </span>
        </Row>
        <Row className="NewCollectionDes">
          Worldwide Web is an interoperable pixel art MMORPG metaverse game giving utility to popular NFT projects.The game uses NFTS for in-game avatars,pets,lands,items and quests.Deployed with a build-first mentality by a group of crypto-native game developers,artists,coders and marketers;rapidly pushing out new technologies and applications
        </Row>
        <Row className="InfoCellBox" justify="center">
          <Row className="InfoCell">
            <span className="NewItemCaption">7</span>
            <span className="NewItemText">Naffles Listed</span>
          </Row>
          <Row className="InfoCell">
            <span className="NewItemCaption"><img alt="" className="PriceImg" src={ExploreImage.NftPriceCard.EyeImg} /> 3.5</span>
            <span className="NewItemText">Floor Price</span>
          </Row>
          <Row className="InfoCell">
            <span className="NewItemCaption">1.5k</span>
            <span className="NewItemText">Items</span>
          </Row>
          <Row className="InfoCell" align="middle">
            <span className="NewItemCaption">5.5k</span>
            <span className="NewItemCaption">
              {/* <img
                className="NewItemBlackArrow"
                alt="Black Arrow"
                src={ExploreImage.NftPriceCard.WhiteArrow}
              /> */}
            </span>
            <span className="NewItemText">Owners</span>
          </Row>
        </Row>

      </Row>
    </>
  );
};

export default CollectionInfoBox;

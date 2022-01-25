import React from "react";
import "../css/CoverSection.css";
import { Row, Button } from "antd";
// import { HomeImage } from "constant/ImageConstant";
// import {RightOutlined} from '@ant-design/icons';
// import SectionCard from "./SectionCard";
// import { HomeCardData } from "data/HomeData";
import AvatarCarousel from "./AvatarCarousel";
import SmallCarousel from './SmallCarousel';
import { PUBLIC_PREFIX_PATH } from "config/AppConfig";
import { Link } from "react-router-dom";

const CoverSection = () => {
  return (
    <>
      <Row className="CoverSection" justify="center">
        <Row className="CoverInRow" justify="center">
          <Row className="IntroAd" align="middle">
            <Row className="IntroCol">
              {/* <p className="AdType">NAFFLES NFT ART</p> */}
              <p className="AdMeCaption">
                Sell Your NFTs at Above the Floor Price
              </p>
              <p className="AdText">
                Sellers, maximise profits on your NFTs, while letting Buyers pay
                a fraction of the floor price to win them.
              </p>
              <Row className="HomeButtonGroup">
                <Link to={`/${PUBLIC_PREFIX_PATH}/sell`}>
                  <Button type="primary" className="SellNFT">
                    Sell Your NFT
                  </Button>
                </Link>
                <Link to={`/${PUBLIC_PREFIX_PATH}/explore`}>
                  <Button type="primary" className="SellNFT SellNFTButton">
                    Explore
                  </Button>
                </Link>
              </Row>
            </Row>
            <span className="Split"></span>
            {/* <Row className="ImageCol">
              <img
                alt=""
                className="IntroImage"
                draggable="false"
                src={HomeImage.CoverSection.BgImage}
              />
            </Row> */}
            <SmallCarousel/>
          </Row>
          <AvatarCarousel />
          {/* <SectionCard data={HomeCardData} /> */}
        </Row>
      </Row>
    </>
  );
};

export default CoverSection;

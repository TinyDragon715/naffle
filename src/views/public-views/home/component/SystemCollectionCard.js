import React from "react";
import { Card, Row, Col } from "antd";
import "../css/SystemCollectionCard.css";
import { Link } from "react-router-dom";
import { PUBLIC_PREFIX_PATH } from "config/AppConfig";
import { ExploreImage } from "constant/ImageConstant";

const truncate = (str) => {
  return str.substr(0,6)+"..."+str.substr(str.length-4,str.length-1);
}

const SetInit = (props) => {
  const data = props.data;
  return (
    <Card
      style={{ width: 340 }}
      className="SystemCollectionCard"
      cover={<img alt="" className="SystemCollectionImg" src={data.img} />}
    >
      {/* <img alt="" className="CenterCircle" src={data.img} /> */}

      <Col className="SystemCollectionDes">
        <span className="SystemDesTitle">{data.Title}</span>
        <span className="Shortcard-text">{truncate(data.Price)}</span>
        <div className="SlideStatusBar">
          <div className="SystemLeftStatus">
            <span className="ShortColText">Floor</span>
            <span className="ShortColLeft"><img alt="" className="PriceImg" src={ExploreImage.NftPriceCard.EyeImg} /> 2.69</span>
          </div>
          <span className="Split"></span>
          <div className="SystemPriceStautsRead">
            <span className="SystemShortColText">Tickets From</span>
            <span className="PriceEthH">
              {/* <img
              alt="EthImg"
                className="EthImage"
                src={ExploreImage.NftPriceCard.WhiteArrow}
              /> */}
              <span className="EthPrice"><img alt="" className="PriceImg" src={ExploreImage.NftPriceCard.EyeImg} /> 0.005</span>
            </span>
          </div>
        </div>
        {/* <span className="SystemDesItemCount">{data.Count}</span> */}
        {/* <a href="." className="SystemCollectionView">
          VIEW NAFFLE
        </a> */}
      </Col>
    </Card>
  );
};
const SystemCollectionCard = (props) => {
  const data = props.data;
  return (
    <>
      <Row className="SystemCollectionRowCover" justify="center">
        <Row className="SystemCollectionRow">
          {data.map((item, index) => {
            return (
              <Link to={`/${PUBLIC_PREFIX_PATH}/itemlist`}>
                <SetInit data={item} />
              </Link>
            );
          })}
        </Row>
      </Row>
    </>
  );
};

export default SystemCollectionCard;

import React from "react";
import "../css/NftPriceCard.css";
import { Card, Row, Col } from "antd";
// import { ExploreImage } from "constant/ImageConstant";

// const { Meta } = Card;

const SetInit = (props) => {
  const data = props.data;
  return (
    <>
      <Card
        hoverable
        className="ProfileCardNft"
        cover={
          <img
            alt="example"
            className="ProfileNftImg"
            src={data.img}
          />
        }
      >
        <Row className="ProfileNftRow" align="top">
          <Col className="NftPriceDesText">
            <span className="NftPriceTypeBig">{data.title}</span>
            <span className="NftPriceTypeSmall">{data.title}</span>
          </Col>
          <span className="Split"></span>
          <img alt="" src={data.mark} className="NftPriceMark" />
        </Row>

        <Row justify="center" className="DayRow">
          <span className="DelayDay">5 Days remaining</span>
        </Row>
      </Card>
    </>
  )
}

const NftPriceCard = (props) => {
  const data = props.data;
  return (
    <>
      {
        data.map((item, index) => {
          return (
            <SetInit data={item} />
          )
        })
      }
    </>
  );
};

export default NftPriceCard;

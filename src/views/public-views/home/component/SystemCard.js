import React from "react";
import "../css/SystemCard.css";
import { Card, Row, Col } from "antd";
// import { HomeImage } from "constant/ImageConstant";

const SetInit = (props) => {
  const data = props.data;
  return (
    <>
      <Card className="SystemCardItem" style={{ width: 300 }}>
        <Row className="SysCardRow" justify="center" align="middle">
          <img alt="" className="SysCardImg" src={data.img} />
          <Col className="SysCardDes">
            <span className="SysCardCaption">{data.Caption}</span>
            <span className="SysCardText">{data.Text}</span>
          </Col>
        </Row>
      </Card>
    </>
  );
};

const SystemCard = (props) => {
  const data = props.data;
  return (
    <>
      <Row className="SystemCard">
        <Row className="SysCardInRow">
          {data.map((item, index) => {
            return <SetInit data={item} />;
          })}
        </Row>
      </Row>
    </>
  );
};

export default SystemCard;

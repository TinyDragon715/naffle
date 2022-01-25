import React from "react";
import "../css/SectionCard.css";
import {Card,Col,Row} from "antd";

const SetInit = (props) => {
  const data = props.data;
  return (
    <Card
      style={{ width: 240 }}
      className="NftCard"
      cover={<img alt="" className="SectionCardItemImg" src={data.img} />}
    >
      <Col className="NftDes">
        <span className="NFtTitle">{data.Title}</span>
        <span className="NftText">{data.Text}</span>
        <a href="." className="NftView">VIEW NAFFLE</a>
      </Col>
    </Card>
  );
};
const SectionCard = (props) => {
  const data = props.data;
  return (
    <>
      <Row className="CardRow">
        {data.map((item, index) => {
          return <SetInit data={item} />;
        })}
      </Row>
    </>
  );
};

export default SectionCard;

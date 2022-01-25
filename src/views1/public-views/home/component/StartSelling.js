import React from "react";
import "../css/StartSelling.css";
import { Row } from "antd";
import SellingItem from "./SellingItem";
import { SellingItemData, SellingItemData2 } from "data/HomeData";

const StartSelling = () => {
  return (
    <>
      <Row className="StartSelling" justify="center">
        <Row className="SellingInRow">
          <h2 className="StartSellingCaption">How to<br/> sell your<br/> nft</h2>
          <SellingItem data={SellingItemData} />
        </Row>

        <Row className="SellingInRow">
          <h2 className="StartSellingCaption">Why use <br/>Naffles</h2>
          <SellingItem data={SellingItemData2} />
        </Row>
      </Row>
    </>
  );
};

export default StartSelling;

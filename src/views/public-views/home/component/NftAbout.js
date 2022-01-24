import React from "react";
import "../css/NftAbout.css";
import { Row } from "antd";

const NftAbout = () => {
  return (
    <>
      <Row className="NftAbout" justify="center">
        <Row className="NftInRow">
          <span className="AboutType">ABOUT US</span>
          <span className="AboutCaption">NAFFLES ABOUT</span>
          <span className="AboutText">
            Donec sodales sagittis magna. Sed consequat, leo eget bibendum
            sodales, augue velit cursus nunc. Curabitur ullamcorper ultricies
            nisi. Nam eget dui. Etiam rhoncus Donec sodales sagittis magna. Sed
            consequat, leo eget bibendum sodales, augue velit cursus nunc.
            Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
          </span>
        </Row>
      </Row>
    </>
  );
};

export default NftAbout;

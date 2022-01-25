import React from "react";
import "../css/CoverSystem.css";
import { Row,Col,Button} from "antd";
// import SystemCard from "./SystemCard";
// import { SystemCardData } from "data/HomeData";
import SystemCollectionCard from "./SystemCollectionCard";
import { SystemCollectionData } from "data/HomeData";
import { Link } from "react-router-dom";
import { PUBLIC_PREFIX_PATH } from "config/AppConfig";

const CoverSystem = () => {
  return (
    <>
      <Row className="CoverSystem" justify="center">
        <Row className="SystemInRow" justify="center">
          <Row className="SystemDes" align="middle">
            <Col className="SystemInfo">
              <span className="SystemType">Naffles</span>
              <span className="SystemCaption">
              Hottest Collections
              </span>
            </Col>
            {/* <Col className="SystemText">
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, eget, arcu. In enim justo, rhoncus ut, imper
              diet.
            </Col> */}
          </Row>
          {/* <SystemCard data={SystemCardData} /> */}
          <SystemCollectionCard data={SystemCollectionData} />
          <Link to={`/${PUBLIC_PREFIX_PATH}/explore`}><Button type="primary" className="ViewAllCollection">View all collections</Button></Link>
        </Row>
      </Row>
    </>
  );
};

export default CoverSystem;

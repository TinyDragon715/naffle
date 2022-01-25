import PageHeader from "components/Header/PageHeader";
import React, { useEffect, useState } from "react";
import NftPriceCard from "./component/NftPriceCard";
import {Col,Row} from "antd";
import "./css/index.css";
import {TicketCardData} from 'data/ExploreData';
import CollectionInfoBox from "./component/CollectionInfoBox";
import MenuBar from "./component/MenuBar";
import ContentNav from "./component/ContentNav";
import PageFooter from "components/Footer/PageFooter";
import * as queryString from "query-string";

const NewContent = (props) => {
  const [parsedQuery, setParsedQuery] = useState();
  useEffect(() => {
    setParsedQuery( queryString.parse(window.location.search));
  }, [])
  return (
    <>
      <PageHeader theme="white" />
      <Row class="PageContent">
        <MenuBar theme="blue" />
        <Col className="MainContent">
          <CollectionInfoBox />
          <ContentNav/>
          <Col className="TicketGrid">
            <NftPriceCard data={TicketCardData} parsedQuery={parsedQuery}/>
          </Col>
        </Col>
      </Row>
      <PageFooter />
    </>
  );
};

export default NewContent;

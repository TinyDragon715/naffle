import PageHeader from "components/Header/PageHeader";
import React from "react";
import MenuBar from "./component/MenuBar";
import NftPriceCard from "./component/NftPriceCard";
import { Col, Row } from "antd";
import "./css/index.css";
import { TicketCardData } from "data/ExploreData";
import ContentNav from "./component/ContentNav";
import PageFooter from "components/Footer/PageFooter";
// import { Sidebar } from "primereact/sidebar";
// import { Button } from "primereact/button";

const ExploreView = (props) => {
  // const [visibleLeft, setVisibleLeft] = useState(false);

  return (
    <>
      <PageHeader theme="white" />
      {/* <Sidebar className="ExploreIfMenu" visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
      </Sidebar> */}
      {/* <Button
        icon="pi pi-search"
        onClick={() => setVisibleLeft(true)}
        className="p-mr-2 ExploreSideMenu"
      /> */}
      <Row class="PageContent">
        <MenuBar />
        <Col className="MainContent">
          <ContentNav />
          <Col className="TicketGrid">
            <NftPriceCard data={TicketCardData} />
          </Col>
        </Col>
      </Row>
      <PageFooter/>
    </>
  );
};

export default ExploreView;

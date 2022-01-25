import { Row } from "antd";
import PageHeader from "components/Header/PageHeader";
import React from "react";
import * as queryString from "query-string";
import "./css/SingleCardView.css";
import CardDetailCol from "./component/CardDetailCol";
import CardDetailSingleCard from "./component/CardDetailSingleCard";
import PageFooter from "components/Footer/PageFooter";

const SingleCardView = () => {
    const parsedQuery = queryString.parse(window.location.search);
    const parsedObject = JSON.parse(parsedQuery.token_info);
    return (
        <>
            <PageHeader theme="white" />
            <Row className="SingleCardView" justify="center">
                <Row className="SCVInRow">
                    <CardDetailCol avatar={parsedObject.metaData.token_uri}/>
                    <CardDetailSingleCard  tokenInfo={parsedObject}/>
                </Row>
            </Row>
            <PageFooter />
        </>
    )
}

export default SingleCardView;
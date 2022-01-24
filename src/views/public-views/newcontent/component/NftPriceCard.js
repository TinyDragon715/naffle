import React, { useState, useEffect, createContext } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";

import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import Swal from "sweetalert2";
import RaffleConfig from 'contract';
import "../css/NftPriceCard.css";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { PUBLIC_PREFIX_PATH } from "config/AppConfig";
import { ExploreImage } from "constant/ImageConstant";
import { CURRENT_NETWORK } from "config/NetConfig";
import { string2object, object2string, eth2number } from "utils/utils";
import { connect } from "react-redux";
import { storeNFT } from "actions/nft";
import { toLowerCase } from "utils/utils";
import { timestamp2days } from "utils/utils";

const SetInit = (props) => {

  const {library, account} = useWeb3React();
  const data = props.data;
  const [campaignInfo, setCampaignInfo] = useState();
  const [currentTickets, setCurrentTickets] = useState();

  const RaffleSystem = new Contract(RaffleConfig.RaffleSystemAddress, RaffleConfig.RaffleSystemAbi, library?.getSigner(account));

  const getCampaignInfo = async () => {
    const txRes = await RaffleSystem.creatorToCampaign(data.metaData.owner_of, data.contractData[0]);
    return txRes;
  }
  const getNumberOfTickets = async() => {
    const txRes = await RaffleSystem.getNumberOfCurrentTickets(data.metaData.owner_of, data.contractData[0]);
    return txRes.toNumber();
  }
  useEffect( async () => {
    const txRestemp =await getCampaignInfo();
    const currentTickets = await getNumberOfTickets();
      if(txRestemp && currentTickets){
        setCampaignInfo(txRestemp);
        setCurrentTickets(currentTickets);
      }
  }, []);

  return (
    <>
      <Link to={`/${PUBLIC_PREFIX_PATH}/explore/singleCard/?token_info=${object2string(data)}`}>
        <Card
          hoverable
          style={{ width: 380 }}
          className="NftPriceCard FourGrid"
          cover={
            <img
              alt="example"
              className="NftPriceImg"
              src={data.metaData.token_uri}
            />
          }
        >
          <img
            src={data.metaData.token_uri}
            alt="circle"
            className="NewContentCircle"
          />
          <Row className="NewPriceDes">
            <Col className="CollectionContact">
              <span className="NewPriceTypeBig">{`${data.metaData.name} - ${data.metaData.symbol}`}</span>
            </Col>
            <span className="Split"></span>
          </Row>
          <Row className="TicketRow">
            <div className="Col NewContentCol">
              <span className="new-caption">Ticket price</span>
              <span><img alt="" className="PriceImg" src={ExploreImage.NftPriceCard.EyeImg} />{eth2number(data.contractData.ticketPrice)}<span className="NewContentPrice">[ $1930 ]</span></span>
            </div>
            <span className="Split"></span>
            <div className="Col NewContentCol">
              <span className="new-caption">Tickets Left</span>
              <span>{currentTickets}/ {currentTickets}</span>
            </div>
          </Row>
          <Row justify="center" className="DayRow">
            <span className="DelayDay">{
              campaignInfo ? timestamp2days(campaignInfo[4].toNumber() - campaignInfo[3].toNumber()) : "Err"
            } Days left</span>
          </Row>
        </Card>
      </Link>
    </>
  )
}

const NftPriceCard = (props) => {
  const {parsedQuery} = props;
  const storedNfts = props.storedNfts;
  // const owner = props.parsedQuery.address;
  const [nfts, setNFTs] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const { library, account } = useWeb3React();
  const [queryData,setQueryData] = useState();
  
  useEffect(() => {
    if (account) {
      const filteredArray = [];
      storedNfts.nfts.map(data => {
        if (data.metaData.owner_of == account) {
          filteredArray.push(data);
        }
      })
      setFilteredNFTs(filteredArray);
    }
  }, [])

  useEffect(() => {
    if(parsedQuery)
    {
      const {address} = parsedQuery;
      setQueryData(address);
    }
  })
  return (
    <>
      {
        queryData ? storedNfts.nfts?.map((item, index) => {
          if (toLowerCase(item.metaData.owner_of) == toLowerCase(queryData.toString())) {
            return (
              <SetInit data={item} />
            )
          }
        }) : ""
      }
    </>
  );
};

const mapStateToProps = (state) => ({
  storedNfts: state.storedNfts
})

export default connect(mapStateToProps, { storeNFT })(NftPriceCard);

import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import { Col, Row, Radio } from "antd";
import React, { useEffect, useState } from "react";
import "../css/CardDetailSingleCard.css";
import { ExploreImage } from "constant/ImageConstant";
import { Square, Upload, Share, ListUl } from "react-bootstrap-icons";

import { Clock } from "react-bootstrap-icons";
import { InputNumber } from 'primereact/inputnumber';
import NFTTransaction from "./NFTTransaction";
import RefferalHistory from "./RefferalHistory";
import RaffleConfig from "contract";

import {Contract} from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { timeConverter, eth2number } from "utils/utils";
import Swal from "sweetalert2";

const options = [
  { label: <Square />, value: "Square" },
  { label: <Upload />, value: "Upload" },
  { label: <Share />, value: "Share" },
  { label: <ListUl />, value: "ListUl" },
];

const CardDetailSingleCard = (props) => {
  const [value3, setValue] = useState("");
  const [value20, setValue20] = useState(1);
  const {tokenInfo} = props;
  const [campaignInfo, setCampaignInfo] = useState([]);
  const [currentTickets, setCurrentTickets] = useState(0);
  const onChange3 = (e) => {
    setValue(e.target.value);
  };
  const {enableWeb3, authenticate} = useMoralis();
  const {library, account} = useWeb3React();
  const RaffleSystem = new Contract(RaffleConfig.RaffleSystemAddress, RaffleConfig.RaffleSystemAbi, library?.getSigner(account));

  const getCampaignInfo = async (_address, _id) => {
      const txRes = await RaffleSystem.creatorToCampaign(_address, _id);
      return txRes;
  }

  const getNumberOfTickets = async() => {
    const txRes = await RaffleSystem.getNumberOfCurrentTickets(tokenInfo.metaData.owner_of, tokenInfo.contractData[0]);
    return txRes.toNumber();
  }

  const buyTicket = async () => {
    const image_url = `https://picsum.photos/500/500`;
    const buyOption = {
      type:"native",
      contractAddress: RaffleConfig.RaffleSystemAddress,
      abi: RaffleConfig.RaffleSystemAbi,
      functionName: "buyTicket",
      msgValue: Moralis.Units.ETH(eth2number(tokenInfo.contractData[4]) * value20),
      receiver: RaffleConfig.RaffleSystemAddress,
      params: {
        _creator: tokenInfo.metaData.owner_of,
        _campaignIndex: tokenInfo.contractData[0],
        _ticketAvatarURI: image_url,
        _ticketAmount: value20
      }
    }
    try{
      Moralis.enableWeb3();
      await Moralis.executeFunction(buyOption);
      Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: `You bought ${value20} tickets`
      })
    }
    catch(err) {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Faild buying ticket.'
      })
    }
    console.log("Creator_", tokenInfo.metaData.owner_of);
    console.log("AuctionID_", tokenInfo.contractData[0]);
    console.log("ImageURI_", image_url);
    console.log("Value_", value20);

    // const tx = await RaffleSystem.buyTicket(tokenInfo.metaData.owner_of, tokenInfo.contractData[0], image_url, value20);
  }
  useEffect(async() => {
    setCampaignInfo(await getCampaignInfo(tokenInfo.metaData.owner_of, tokenInfo.contractData[0]));
    setCurrentTickets(await getNumberOfTickets()); 
  }, []);
  return (
    <>
      <Col className="CardDetailSingleCard">
        <Row className="NaffleEndDate">
          <Clock color="white" className="ClockIco" /> naffle ends,
          {timeConverter(campaignInfo[4])}
        </Row>
        <Row className="EndNaffleCaption">
          {tokenInfo.metaData.name}
          <span className="Split"></span>
          <span className="SingleNaffleID">#1214</span>
          </Row>
        <Row className="EndNaffleCaptionSmall" align="middle">
          {tokenInfo.metaData.symbol}
          <img
            alt=""
            className="SpecMark"
            src={ExploreImage.NftPriceCard.SpecMarkImg}
          />
        </Row>
        <Row className="EndCardPIRow">
          <Col className="EndCardPICol">
            <span className="EndCardCaption">Ticket Price</span>
            <Row className="EndMarkRow TicketRow">
              <img
                alt=""
                className="EndCardImg"
                src={ExploreImage.NftPriceCard.BlackArrow}
              />
              <span className="EndCardPrice TicketPrice1">{eth2number(tokenInfo.contractData[4])}<span className="SingleUS">($1934)</span></span>
            </Row>
          </Col>
          <span className="SpecSplit"></span>
          <Col className="EndCardPICol">
          <span className="EndCardCaption">Tickets Left</span>
            <Row className="EndMarkRow" align="bottom">
              <span className="EndCardPrice TempRow">
                {currentTickets} <span className="EndSlash">/</span>
                <span className="EndCardPriceSmall">{campaignInfo[1]?.toNumber()}</span>
              </span>
            </Row>
          </Col>
        </Row>
        <Row align="middle" className="EndCardToolBar">
        <InputNumber inputId="minmax-buttons" value={value20} onValueChange={(e) => setValue20(e.value)} mode="decimal" showButtons min={1} max={campaignInfo[1]?.toNumber()} style={{ marginRight:"10px"}}/>
          <a href="#" className="EndBuyTicket" onClick={buyTicket}>
            BUY TICKET
          </a>
          <Radio.Group
            options={options}
            onChange={onChange3}
            value={value3}
            optionType="button"
          />
        </Row>
        <NFTTransaction/>
        <RefferalHistory/>
      </Col>
    </>
  );
};

export default CardDetailSingleCard;

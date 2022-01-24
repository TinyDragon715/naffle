import React, { useEffect, useState } from "react";
import "../css/AvatarCarousel.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Row } from "antd";
import "../css/AvatarCarousel.css";
import { useWeb3React } from "@web3-react/core";
import {Contract } from "@ethersproject/contracts";

import Moralis from "moralis";
import { useMoralis } from "react-moralis";

import { CarouselData, responsive } from "data/CarouselData";
import { Input, InputNumber, Button, Form, DatePicker } from "antd"
import Swal from "sweetalert2";
import RaffleConfig from 'contract';
import { toUnixTimestamp, mustBeLongTime, isEmpry } from "utils/utils";

import Stamp from "assets/image/Sell/stamp.png";
import Ribbon from "components/common/Ribbon";

// const truncate = (str) => {
//   return str.substr(0,6)+"..."+str.substr(str.length-4,str.length-1);
// }
const AvatarCarousel = () => {

  const { account, library } = useWeb3React();
  const { authenticate, enableWeb3, user } = useMoralis();
  Moralis.enableWeb3();
  const [nfts, setNFTs] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const filteredNFTsArray = [];
  const options = { chain: 'rinkeby', address: account };

  const [sellInfo, setSellInfo] = useState({
    price: null,
    tikets: null,
    endTime: null
  });

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
    length: {
      password: '${label} must longer than 6 characters.'
    }
  };

  const sellForm = (
    <Form {...layout} name="nest-messages" onFinish={(e) => console.log(e)} validateMessages={validateMessages} style={{ width: "100%" }}>
      <Form.Item
        name={['user', 'price']}
        label="Price"
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
      >
        <InputNumber style={{ borderRadius: "5px", width: "100%" }} onChange={(value) => setSellInfo({
          price: value,
          tickets: sellInfo.tickets,
          endTime: sellInfo.endTime
        })} value={sellInfo.price} min={1} />
      </Form.Item>
      <Form.Item
        name={['user', 'tickets']}
        label="Tickets"
        rules={[
          {
            type: 'number',
          },
          {
            required: true,
          }
        ]}
        hasFeedback
      >
        <InputNumber style={{ borderRadius: "5px", width: "100%" }} onChange={(value) => setSellInfo({
          price: sellInfo.price,
          tickets: value,
          endTime: sellInfo.endTime
        })} value={sellInfo.tickets} min={1} />
      </Form.Item>
      <Form.Item
        name={['user', 'endTime']}
        label="Deadline"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker style={{ borderRadius: "5px", width: "100%" }} onChange={(value) => setSellInfo({
          price: sellInfo.price,
          tickets: sellInfo.tickets,
          endTime: toUnixTimestamp(value)
        })} value={sellInfo.endTime} showTime />
      </Form.Item>
    </Form>
  );

  const submitSell = async (_nftAddress, _tokenId) => {
    const { tickets, price, endTime } = sellInfo;
    const executeOption = {
      contractAddress: RaffleConfig.RaffleSystemAddress,
      functionName: "createCampaign",
      abi: RaffleConfig.RaffleSystemAbi,
      params: {
        _nftAddress: _nftAddress,
        _nftTokenId: _tokenId,
        _totalTickets: tickets,
        _ticketPrice: sellInfo.price,
        _endTime: sellInfo.endTime
      }
    }
    const approveOption = {
      contractAddress: _nftAddress,
      functionName: "approve",
      abi: RaffleConfig.ERC721,
      params: {
        to: RaffleConfig.RaffleSystemAddress,
        tokenId: _tokenId
      }
    }
    //validate campaign time
    if (!mustBeLongTime(sellInfo.endTime)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid deadline.'
      })
      return false;
    }
    if (isEmpry(price) || isEmpry(tickets) || isEmpry(endTime)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must fill all fields.'
      })
      return false;
    }
    //authentication user for web3 provider
    await Moralis.authenticate().then(user => {
      console.log(user);
      Swal.fire({
        icon: 'success',
        title: 'Authorization success',
        text: 'You authenticated successfully.'
      })
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
      return false;
    })
    //approve nft to raffle system
    try {
      await Moralis.executeFunction(approveOption);
      Swal.fire({
        icon: 'success',
        title: 'Congratulation',
        text: 'You have approved your NFT successfully.'
      })
    }
    catch (err) {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
      return false;
    }
    //create campaign with nft
    try {
      await Moralis.executeFunction(executeOption);
      // const result = await transaction.wait();
      Swal.fire({
        icon: 'success',
        title: 'Congratulation',
        text: 'You have ordered your NFT successfully.'
      })
    }
    catch (err) {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
      return false
    }
  }

  const getApproved = async (_nftAddress, tokenId) => {
    /*Using ReactWeb3*/
    // const erc721 = new Contract(_nftAddress, RaffleConfig.ERC721, library?.getSigner(account));
    // const approvedAddress = await erc721.getApproved(tokenId);
    // return approvedAddress;

    /*Using Moralis SDK*/
    const callOption = {
      contractAddress: _nftAddress,
      functionName: "getApproved",
      abi: RaffleConfig.ERC721,
      params: {
        tokenId: String(tokenId)
      }
    }
    try {
      Moralis.enableWeb3();
      const approvedAddress = await Moralis.executeFunction(callOption);
      return approvedAddress;

    }
    catch (err) {
      console.log(err.message);
      return '0x0000000000000000000000000000000000000000';
    }
  }

  const filterNFTs = async () => {
    nfts.map(async(nft, indx) => {
      if(getApproved(nft.token_address, nft.token_id) == RaffleConfig.RaffleSystemAddress){
        filteredNFTsArray.push(nft);
      }
    })
    console.log(filteredNFTsArray);
    setFilteredNFTs(filteredNFTsArray);
  }

  useEffect(async () => {
    if (account) {
      const ethNFTs = await Moralis.Web3API.account.getNFTs(options);
      await setNFTs(ethNFTs.result);
      // const filtersNFTs = nfts.filter((nft, indx) => getApproved(nft.token_address, nft.token_id) == RaffleConfig.RaffleSystemAddress);
      // setFilteredNFTs(filtersNFTs);
      // console.log(filteredNFTs);
      await filterNFTs();
      console.log("FilteredNFT", filteredNFTs);
    }
  }, [])

  return (
    <>
      <div className="ProfileCarouselRow">
        <Row className="ProfileBNBCCaption">Approved Naffles</Row>
        <Carousel className="ProfileCarousel" responsive={responsive} infinite>
          {filteredNFTs.map( (nft, indx) => {
            return (
              <div className="flip-card">
                <label for={`nft${indx}`} id="test">
                  <input type="checkbox" className="nft-checkbox" id={`nft${indx}`} hidden />
                  <div className="flip-card-inner">
                    <div className="Profilecard text-left mt-5 flip-card-front" key={indx}>
                      <Ribbon title={"NAFFLE"} />
                      <div className="ProfileCardImgCover">
                        <img
                          style={{ height: "400px", width: "400px" }}
                          src={nft.token_uri}
                          alt="Alt text"
                          draggable="false"
                          className="ProfileBlogger"
                        />
                      </div>
                      {/* <img alt="" className="ProfileCenterCircle" src={post.img} /> */}
                      <div className="Profilecard-body">
                        <div className="Profilecard-title">
                          <span>{nft.name}</span>
                          <span className="Split" />
                          <span>{`${nft.token_address.slice(0, 6)}...${nft.token_address.slice(nft.token_address.length - 5, nft.token_address.length)}`}</span>
                        </div>
                        <a href={`https://testnets.opensea.io/assets/${nft.token_address}/${nft.token_id}`} target="_blank" rel="noreferrer" onClick={() => console.log(nfts)}>
                          <div className="Profilecard-text">View on <span className="TextOpenSea">OPENSEA</span></div>
                        </a>
                        {/* <div className="Profilecard-price">{post.Price}</div> */}
                      </div>
                    </div>
                    <div className="Profilecard text-left mt-5 flip-card-back flex">
                      <div className="flip-card-back-overlay sell-form flex col">
                        <div className="card-form-title flex">
                        </div>
                        {sellForm}
                        <div className="card-form-submit flex">
                          <Button type="primary" className="theme-background card-submit flex" style={{ width: "100%", }} onClick={() => submitSell(nft.token_address, nft.token_id)}>
                            SELL
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default AvatarCarousel;

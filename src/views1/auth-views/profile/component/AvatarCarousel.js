import React, { useEffect, useState } from "react";
import "../css/AvatarCarousel.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Row } from "antd";
import "../css/AvatarCarousel.css";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";

import Moralis from "moralis";
import { useMoralis } from "react-moralis";

import { CarouselData, responsive } from "data/CarouselData";
import { Input, InputNumber, Button, Form, DatePicker } from "antd"
import Swal from "sweetalert2";
import RaffleConfig from 'contract';
import { toUnixTimestamp, mustBeLongTime, isEmpry } from "utils/utils";
import { CURRENT_NETWORK } from "config/NetConfig";

import Stamp from "assets/image/Sell/stamp.png";
import Ribbon from "components/common/Ribbon";
import { ValueSource } from "react-avatar";
import { BigNumber } from "@ethersproject/bignumber";
import { eth2number, timestamp2days } from "utils/utils";

// const truncate = (str) => {
//   return str.substr(0,6)+"..."+str.substr(str.length-4,str.length-1);
// }
const AvatarCarousel = () => {

  const { account, library } = useWeb3React();
  const { authenticate, enableWeb3, user } = useMoralis();
  Moralis.enableWeb3();
  const [nfts, setNFTs] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [originalNFTs, setOriginalNFTs] = useState([]);
  const [ticketNFTs, setTicketNFTs] = useState([]);
  const [allNfts, setAllNfts] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const options = { chain: CURRENT_NETWORK, address: account };

  const RaffleSystem = new Contract(RaffleConfig.RaffleSystemAddress, RaffleConfig.RaffleSystemAbi, library?.getSigner(account));

  const [sellInfo, setSellInfo] = useState({
    nftPrice: null,
    price: null,
    tikets: null,
    endTime: null
  });

  const layout = {
    labelCol: { span: 16 },
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
  const inputStyle = { borderRadius: "5px", width: "100%", background: "transparent", borderColor: '#64eeec', color: '#64eeec', };
  const sellForm = (
    <Form {...layout} name="nest-messages" onFinish={(e) => console.log(e)} validateMessages={validateMessages} style={{ width: "100%" }}>
      <Form.Item
        name={['user', 'price']}
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
        style={{ width: "100%" }}
      >
        <InputNumber style={inputStyle} onChange={(value) => setSellInfo({
          price: value,
          nftPrice: sellInfo.nftPrice,
          tickets: sellInfo.tickets,
          endTime: sellInfo.endTime
        })} value={sellInfo.price} min={0} placeholder="Ticket Price" />
      </Form.Item>
      <Form.Item
        name={['user', 'nftprice']}
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
      >
        <InputNumber style={inputStyle} onChange={(value) => setSellInfo({
          price: sellInfo.price,
          nftPrice: value,
          tickets: sellInfo.tickets,
          endTime: sellInfo.endTime
        })} value={sellInfo.nftPrice} min={0} placeholder="NFT Price" />
      </Form.Item>
      <Form.Item
        name={['user', 'tickets']}
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
        <InputNumber style={inputStyle} onChange={(value) => setSellInfo({
          price: sellInfo.price,
          nftPrice: sellInfo.nftPrice,
          tickets: value,
          endTime: sellInfo.endTime
        })} value={sellInfo.tickets} min={1} placeholder="Number of total tickets" />
      </Form.Item>
      <Form.Item
        name={['user', 'endTime']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker style={inputStyle} onChange={(value) => setSellInfo({
          price: sellInfo.price,
          nftPrice: sellInfo.nftPrice,
          tickets: sellInfo.tickets,
          endTime: toUnixTimestamp(value)
        })} value={sellInfo.endTime} showTime placeholder="Raffle Deadline" />
      </Form.Item>
    </Form>
  );

  const submitSell = async (_nftAddress, _tokenId) => {
    const { tickets, price, endTime } = sellInfo;
    if (isEmpry(price) || isEmpry(tickets) || isEmpry(endTime)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must fill all fields.'
      })
      return false;
    }
    setButtonLoading(true);
    const executeOption = {
      contractAddress: RaffleConfig.RaffleSystemAddress,
      functionName: "createCampaign",
      abi: RaffleConfig.RaffleSystemAbi,
      params: {
        _nftAddress: _nftAddress,
        _nftTokenId: _tokenId,
        _totalTickets: tickets,
        _price: Moralis.Units.ETH(sellInfo.nftPrice),
        _ticketPrice: Moralis.Units.ETH(sellInfo.price),
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
      setButtonLoading(false)
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
      setButtonLoading(false)
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
      setButtonLoading(false);
    }
    catch (err) {
      console.log(err)
      console.log(executeOption)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
      setButtonLoading(false)
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

  const getAllNFTs = async () => {
    const callOption = {
      contractAddress: RaffleConfig.RaffleSystemAddress,
      functionName: "getAllNaffleNFTs",
      abi: RaffleConfig.RaffleSystemAbi,
      params: {}
    }
    try {
      Moralis.enableWeb3();
      const approvedAddress = await Moralis.executeFunction(callOption);
      setAllNfts(approvedAddress);
      return approvedAddress;
    }
    catch (err) {
      return '0x0000000000000000000000000000000000000000';
    }
  }

  const getCampaignCache = async (_nftAddress, _nftTokenId) => {
    return await RaffleSystem.campaignCache(_nftAddress, _nftTokenId)
  }

  const openCardDashboard = async (_nftAddress, _nftTokenId, _nftTokenUri, _nftTokenName) => {
    const cache = await getCampaignCache(_nftAddress, _nftTokenId);
    const ERC721 = new Contract(_nftAddress, RaffleConfig.ERC721, library?.getSigner(account));
    console.log(cache);
    Swal.fire({
      title: _nftTokenName,
      imageUrl: _nftTokenUri,
      imageWidth: 550,
      imageHeight: 225,
      html: `<div className='swal-in flex col'>Tickets: ${cache[11].toNumber()}/${cache[1].toNumber()}, Ticket Price: ${eth2number(cache[2])}</div>
              <div className='swal-in flex col'>NFT Price: ${eth2number(cache[10])}</div>
            <div className='swal-in flex col'>${timestamp2days(4)} days left.</div>`,
      width: 600,
      padding: '3em',
      color: '#64eeec',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Accept all bids',
      cancelButtonText: 'Close',
      denyButtonText: 'Cancel Campaign',
      denyButtonColor: '#64eeec',
      backdrop: `
        rgba(0,0,123,0.4)
        url("../../../../assets/image/Sell/cat.gif")
        left top
        no-repeat
      `
    }).then(async res => {
      if (res.isDenied) {
        let tx = null;
        tx = await RaffleSystem.cancelCampaign(cache[0].toNumber());
        tx.wait();
        try {
          tx = await ERC721.approve('0x0000000000000000000000000000000000000000', _nftTokenId);
          tx.wait();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'The campaign successfully calcelled'
          })
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
          })
        }
      } else if (res.isConfirmed) {
        let tx = null;
        try {
          tx = await RaffleSystem.chooseWinnerAndSell(account, cache[0].toNumber());
          tx.wait();
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
          })
        }
      }
    })
  }

  useEffect(() => {
    if (account) {
      Moralis.Web3API.account.getNFTs(options).then((ethNFTs) =>
        setNFTs(ethNFTs.result)
      );
    }
    window.onbeforeunload = function () {

    }
  }, [account])

  useEffect(async () => {
    if (account) {

      const processedArray = await Promise.all(nfts.map(async (nft) => {
        nft.approvedAddress = await getApproved(nft.token_address, nft.token_id)
        return nft
      }))
      const result1 = processedArray.filter((nft => {
        return nft.approvedAddress == RaffleConfig.RaffleSystemAddress && (nft.token_address != RaffleConfig.TicketNFTAddress || nft.name != "TicketNFT")
      }))
      const result2 = processedArray.filter((nft => {
        return nft.approvedAddress != RaffleConfig.RaffleSystemAddress && (nft.token_address != RaffleConfig.TicketNFTAddress || nft.name != "TicketNFT")
      }))
      const result3 = processedArray.filter((nft => {
        return nft.token_address == RaffleConfig.TicketNFTAddress || nft.name == "TicketNFT";
      }))
      setFilteredNFTs(result1);
      setOriginalNFTs(result2);
    }
  }, [nfts, account])

  return (
    <>
      <div className="ProfileCarouselRow">
        <Row className="ProfileBNBCCaption">All NFTs in wallet</Row>
        <Carousel className="ProfileCarousel" responsive={responsive} infinite>
          {nfts.map((nft, indx) => {
            return (
              <div className="flip-card">
                <label for={`nft${indx}`} id="test">
                  <input type="checkbox" className="nft-checkbox" id={`nft${indx}`} hidden />
                  <div className="flip-card-inner">
                    <div className="Profilecard text-left mt-5 flip-card-front" key={`${nft.token_address}${nft.token_id}`}>
                      <div className="ProfileCardImgCover">
                        <img
                          style={{ height: "400px", width: "400px" }}
                          src={nft.token_uri}
                          alt="Alt text"
                          draggable="false"
                          className="ProfileBlogger"
                          onError={currentTarget => {
                            currentTarget.onerror = null;
                            currentTarget.src = 'src/assets/image/Sell/cat.gif'
                          }}
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
                  </div>
                </label>
              </div>
            );
          })}
        </Carousel>
        <Row className="ProfileBNBCCaption">Unapproved NFTs</Row>
        <Carousel className="ProfileCarousel" responsive={responsive} infinite>
          {originalNFTs.map((nft, indx) => {
            return (
              <div className="flip-card">
                <label for={`nft${indx}`} id="test">
                  <input type="checkbox" className="nft-checkbox" id={`nft${indx}`} hidden />
                  <div className="flip-card-inner">
                    <div className="Profilecard text-left mt-5 flip-card-front" key={`${nft.token_address}${nft.token_id}`}>
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
                    {
                      nft.token_address != RaffleConfig.TicketNFTAddress && nft.name != "TicketNFT" ? <div className="Profilecard text-left mt-5 flip-card-back flex">
                        <div className="flip-card-back-overlay sell-form flex col">
                          <div className="card-form-title flex">
                          </div>
                          {sellForm}
                          <div className="card-form-submit flex">
                            <Button type="primary" className="theme-background card-submit flex" style={{ width: "100%", }} onClick={() => submitSell(nft.token_address, nft.token_id)} loading={buttonLoading}>
                              SELL
                            </Button>
                          </div>
                        </div>
                      </div> : <div className="Profilecard text-left mt-5 flip-card-back flex">
                        <div className="ProfileCardImgCover">
                          <img
                            style={{ height: "400px", width: "400px" }}
                            src={nft.token_uri}
                            alt="Alt text"
                            draggable="false"
                            className="ProfileBlogger"
                          />
                        </div>
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
                    }
                  </div>
                </label>
              </div>
            );
          })}
        </Carousel>
        <Row className="ProfileBNBCCaption">Approved Naffles</Row>
        <Carousel className="ProfileCarousel" responsive={responsive} infinite>
          {filteredNFTs.map((nft, indx) => {
            const cache = getCampaignCache(nft.token_address, nft.token_id);
            return (
              <div className="flip-card">
                <label for={`nft${indx}`} id="test">
                  <input type="checkbox" className="nft-checkbox" id={`nft${indx}`} hidden />
                  <div className="flip-card-inner">
                    <div className="Profilecard text-left mt-5 flip-card-front" key={`filtered-${nft.token_address}${nft.token_id}`}>
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
                      <div className="flip-card-back-overlay sell-form flex col filtered-card-back">
                        <div className="card-form-submit flex">
                          <div className="cursor-pointer" onClick={() => openCardDashboard(nft.token_address, nft.token_id, nft.token_uri, nft.name)}>
                            <img src={Stamp} alt="setting" />
                          </div>
                          {/* <Button type="primary" className="antd-override-button theme-background card-submit flex" onClick={() => submitSell(nft.token_address, nft.token_id)}>
                            
                          </Button> */}
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

import React from "react";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

import PageFooter from "components/Footer/PageFooter";
import PageHeader from "components/Header/PageHeader";

import Fortmatic from "fortmatic";
import WalletLink from "walletlink";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useWeb3React } from "@web3-react/core";
import {injected} from "config/Connectors";
import { Bitski } from "bitski";
import { SharedImage } from "constant/ImageConstant";
import { Row } from "antd";

import { PUBLIC_PREFIX_PATH,AUTH_PREFIX_PATH } from 'config/AppConfig';
import { FileEarmarkSlides } from "react-bootstrap-icons";

const MetamaskCheck = () => {
  const metamaskProvider = window.ethereum.providers.find(
    (provider) => provider.isMetaMask
  );
  const web3 = new Web3();
  web3.setProvider(metamaskProvider);
  web3.eth
    .requestAccounts()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
const FortmaticCheck = () => {
  const fm = new Fortmatic("pk_test_700EB9264239ECEC");
  const web3 = new Web3(fm.getProvider());

  web3.eth
    .getAccounts()
    .then((res) => {
      console.log("account ::", res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
const CoinbaseCheck = () => {
  const APP_NAME = "My Awesome App";
  const APP_LOGO_URL = "https://example.com/logo.png";
  const ETH_JSONRPC_URL =
    "https://mainnet.infura.io/v3/27e484dcd9e3efcfd25a83a78777cdf1";
  const CHAIN_ID = 1;

  const walletLink = new WalletLink({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: false,
  });

  const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
  ethereum
    .request({ method: "eth_requestAccounts" })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
const WalletConnectCheck = () => {
  const Provider = new WalletConnectProvider({
    infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
  });
  Provider.enable()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  //  Create Web3
  // const web3 = new Web3(Provider);
};
const bitskicheck = () => {
  // const endpoint = "";
  const bitski = new Bitski(
    "e8456fb3-5f63-49ab-875f-53343c636ccb",
    "https://s3uor.csb.app/callback.html"
  );
  // const network = {
  //   rpcUrl: endpoint,
  //   chainId: 0xd2ba743e9fef4,
  // };
  // const provider = bitski.getProvider({ network });

  bitski
    .signIn()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const SellPage = () => {
  const {activate, deactivate, account} = useWeb3React();
  const navigate = useNavigate();
  useEffect(() => {
    if(account){
      navigate(`/${AUTH_PREFIX_PATH}/profile`);
    }
  },[account])

  return (
    <>
      <PageHeader theme="white" />
      <Row className="SellContentCover" justify="center">
        <Row className="SellContentInRow">
            <Row justify="center">
                <h2 className="SellCaption">YOU NEED AN ETHEREUM WALLET TO USE NAFFLES</h2>
                <p className="SellText">Connect with one of our available<span className="HightLight"> wallet !</span> providers to create a new one.</p>
            </Row>
          <ul>
            <li className="link-item" onClick={!account ? () => activate(injected) : deactivate}>
              <img
                alt=""
                className="MetamaskImg"
                src={SharedImage.MetamaskImg}
              />
              <span className="MetamaskText">{account ? "Disconnect" : "Metamask"}</span>
            </li>
            <li className="link-item" onClick={FortmaticCheck}>
              <img alt="" className="MetamaskImg" src={SharedImage.Fortmatic} />
              <span className="MetamaskText">Fortmatic</span>
            </li>
            <li className="link-item" onClick={CoinbaseCheck}>
              <img
                alt=""
                className="MetamaskImg"
                src={SharedImage.CoinbaseImg}
              />
              <span className="MetamaskText">Coinbase</span>
            </li>
            <li className="link-item" onClick={WalletConnectCheck}>
              <img
                alt=""
                className="MetamaskImg"
                src={SharedImage.WalletConnect}
              />
              <span className="MetamaskText">WalletConnect</span>
            </li>
            <li className="link-item" onClick={bitskicheck}>
              <img
                alt=""
                className="MetamaskImg"
                src={SharedImage.BitSkiImage}
              />
              <span className="MetamaskText">bitski</span>
            </li>
          </ul>
        </Row>
      </Row>
      <PageFooter />
    </>
  );
};

export default SellPage;

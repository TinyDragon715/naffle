import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useNavigate, useHref } from "react-router-dom";
import "../css/WalletMenu.css";
import { SharedImage } from "constant/ImageConstant";
import { Sidebar } from "primereact/sidebar";
import Fortmatic from "fortmatic";
import WalletLink from "walletlink";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useWeb3React } from "@web3-react/core";
import { injected } from "config/Connectors";
import { Bitski } from "bitski";
import { PersonCircle } from "react-bootstrap-icons";
import { PUBLIC_PREFIX_PATH } from "config/AppConfig";

const WalletMenu = forwardRef((props, ref) => {
  const { activate, deactivate, account } = useWeb3React();
  const navigate = useNavigate();

  const FortmaticCheck = () => {
    const fm = new Fortmatic("pk_test_700EB9264239ECEC");
    const web3 = new Web3(fm.getProvider());

    web3.eth.getAccounts().then((res) => {
      console.log("account ::", res);
      return res;
    }).catch((err) => {
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
    ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
      console.log(res);
    })
      .catch((err) => {
        console.log(err);
      });;
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

  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    WalletShow() {
      setVisible(true);
    },
  }));
  useEffect(() => {
    if (!account) {
      navigate(`/${PUBLIC_PREFIX_PATH}/sell`);
    }
  }, [account])

  return (
    <>
      <Sidebar
        className="WalletMenu"
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
      >
        <div className="UserAvatar">
          <PersonCircle className="UserPersonIco" />
          <span className="MyWallet">My Wallet</span>
        </div>
        <div className="WalletDes">
          Connect with one of our available wallet providers or create a new
          one.
        </div>
        <ul>
          <li onClick={!account ? () => activate(injected) : deactivate}>
            <img alt="" className="MetamaskImg" src={SharedImage.MetamaskImg} />
            <span className="MetamaskText">{account ? "Disconnect" : "Metamask"}</span>
          </li>
          <li onClick={FortmaticCheck}>
            <img alt="" className="MetamaskImg" src={SharedImage.Fortmatic} />
            <span className="MetamaskText">Fortmatic</span>
          </li>
          <li onClick={CoinbaseCheck}>
            <img alt="" className="MetamaskImg" src={SharedImage.CoinbaseImg} />
            <span className="MetamaskText">Coinbase</span>
          </li>
          <li onClick={WalletConnectCheck}>
            <img alt="" className="MetamaskImg" src={SharedImage.WalletConnect} />
            <span className="MetamaskText">WalletConnect</span>
          </li>
          <li onClick={bitskicheck}>
            <img alt="" className="MetamaskImg" src={SharedImage.BitSkiImage} />
            <span className="MetamaskText">bitski</span>
          </li>
        </ul>
      </Sidebar>
    </>
  );
});

export default WalletMenu;

import React, { createRef, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Moralis from "moralis";
import "./PageHeader.css";
import { SharedImage } from "constant/ImageConstant";
import { Search, PersonFill, Wallet, Wallet2, List } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import { AUTH_PREFIX_PATH, PUBLIC_PREFIX_PATH } from "config/AppConfig";
import WalletMenu from "views/public-views/home/component/WalletMenu";

import { Row, Menu, Dropdown, Modal, Button, Input, Form } from "antd";
import Swal from "sweetalert2";

const MenuShow = () => {
  document.querySelector(".HeaderTool").classList.toggle("MenuActive");
};
const SearchShow = () => {
  document.querySelector(".SearchBar").classList.toggle("SearchActive");
};

const PageHeader = (props) => {
  const user = new Moralis.User();
  const [modalVisible, setModalVisible] = useState();
  const [modalLoading, setModalLoading] = useState();

  const [currentUser, setCurrentUser] = useState();
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
    email: ""
  });

  const { account } = useWeb3React();

  const theme = props.theme;
  const Wallets = createRef();
  const WalletMenuOpen = () => {
    Wallets.current.WalletShow()
  }

  const createProfile = async () => {
    setModalLoading(true);
    user.set("username", userInfo.name);
    user.set("password", userInfo.password);
    user.set("email", userInfo.email);
    try {
      const res = await user.signUp();
      console.log(res);
      setModalLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Congratulation',
        text: 'You have registed successfully.',
        showDenyButton: true,
        denyButtonText: 'Signin now?'
      })
    }
    catch (err) {
      setModalLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
      console.log(err.message);
    }
  }

  const DropdownMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#" onClick={() => setModalVisible(true)}>
          Create Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          Login
        </a>
      </Menu.Item>
    </Menu>
  )

  const layout = {
    labelCol: { span: 8 },
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

  const signUpForm = (
    <Form {...layout} name="nest-messages" onFinish={(e) => console.log(e)} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
      >
        <Input style={{ borderRadius: "10px" }} onChange={(e) => setUserInfo({
          name: e.target.value,
          email: userInfo.email,
          password: userInfo.password
        })} value={userInfo.name} />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
          {
            required: true,
            message: 'Email is required!'
          }
        ]}
        hasFeedback
      >
        <Input style={{ borderRadius: "10px" }} onChange={(e) => setUserInfo({
          name: userInfo.name,
          email: e.target.value,
          password: userInfo.password
        })} value={userInfo.email} />
      </Form.Item>
      <Form.Item
        name={['user', 'password']}
        label="Password"
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
      >
        <Input.Password type="password" style={{ borderRadius: "10px" }} onChange={(e) => setUserInfo({
          name: userInfo.name,
          email: userInfo.email,
          password: e.target.value
        })} value={userInfo.password} />
      </Form.Item>
    </Form>
  );

  const FormModal = (
    <Modal
      visible={modalVisible}
      title={`Create Profile`}
      onOk={() => setModalVisible(!modalVisible)}
      onCancel={() => setModalVisible(!modalVisible)}
      loading={modalLoading}
      footer={[
        <Button key="submit" type="primary" loading={modalLoading} onClick={createProfile}>
          Submit Profile
        </Button>,
        <Button
          key="link"
          target="_blank"
          href="https://google.com"
          type="primary"
          loading={modalLoading}
          onClick={() => setModalVisible(!modalVisible)}
        >
          Search on Google
        </Button>,
      ]}
      style={{ borderRadius: "10px" }}
    >
      {signUpForm}
    </Modal>
  );

  useEffect(() => {
    // Moralis.initialize(appId);
    // Moralis.serverURL = serverUrl;

    // setCurrentUser(Moralis.User.current());

    // if(!currentUser) {
    //   Swal.fire({
    //     icon: "error",
    //     title: 'Auth Problem...',
    //     text: 'Please signin to use web3 applications.'
    //   })
    // }else {
    //   Swal.fire({
    //     icon: "success",
    //     title: 'Authorization success.',
    //     text: 'You signed in successfully.'
    //   })
    // }
  })

  return (
    <>
      <header className={"GlobalHeader " + theme}>
        <Row className="HeaderRow" align="middle">
          <a href="." className="SearchShow">
            <Search
              onClick={SearchShow}
              color={theme ? "#14c0f1" : "#fdfe40"}
            />
          </a>
          <span className="Expand"></span>
          <Row className="HeaderPrev">
            <Link to="/">
              <img
                alt=""
                src={theme ? SharedImage.BlueLogo : SharedImage.Logo}
                className="PageLogo"
              />
            </Link>
            <Row className="WalletStatus" align="middle">
              <div className={account ? "CircleSpin-Success" : "CircleSpin-Error"}></div>
              <div className="WalletText">{account ? `Connected: ${account.slice(0, 6)}...${account.slice(account.length - 5, account.length)}` : "No Wallet"}</div>
            </Row>
          </Row>
          <Row className="SearchBar" justify="center">
            <Input
              className={`SearchInput ${theme} In`}
              prefix={<Search />}
              placeholder="Search items collections and accounts"
            />
          </Row>
          <Row className={"HeaderTool " + theme} align="middle">
            <Link className="ToolItem ExploreItem" to={`/${PUBLIC_PREFIX_PATH}/explore`}>
              Explore
            </Link>
            <Link to={`/${PUBLIC_PREFIX_PATH}/sell`} className="ToolItem SellItem">Sell</Link>
            {/* <a href="." className="ToolItem"> */}
              <Link to={`/${AUTH_PREFIX_PATH}/profile`}>
                <Dropdown overlay={DropdownMenu} placement="bottomLeft" arrow>
                  <PersonFill
                    color={theme ? "black" : "#fdfe40"}
                    className="PersonItem"
                  />
                </Dropdown>
              </Link>
            {/* </a> */}
            <span className="ToolItem" onClick={WalletMenuOpen}>
              {
                account ? <Wallet2
                  color={theme ? "black" : "#fdfe40"}
                  className="PersonItem"
                /> : <Wallet
                  color={theme ? "black" : "#fdfe40"}
                  className="PersonItem"
                />
              }
            </span>
          </Row>
          <span className="Expand"></span>
          <div className="MenuShow" onClick={MenuShow}>
            <List color={theme ? "#14c0f1" : "#fdfe40"} />
          </div>
        </Row>
      </header>
      <WalletMenu ref={Wallets} />
      {FormModal}
    </>
  );
};

export default PageHeader;

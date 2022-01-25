import React from "react";
import { Button,Input,Menu,Row,Select } from "antd";
import "../css/MenuBar.css";
import { ArrowLeftShort, CurrencyDollar } from "react-bootstrap-icons";

const { SubMenu } = Menu;
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const handleClick = (e) => {
  console.log("click ", e);
};

const MenuBar = () => {
  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      className="MenuBar"
    >
      <Row className="MenuHeader" align="middle">
        <span className="FilterMenu">Filter</span>
        <span className="Split"></span>
        <ArrowLeftShort color="white" className="ArrowShortIco" />
      </Row>
      <SubMenu className="SubMenu" key="sub1" title="Ticket Price">
        <Row className="SubMenuTool" justify="center">
          <Select
            defaultValue="USD"
            style={{ width: 220 }}
            onChange={handleChange}
            className="CurrencySelect"
          >
            <Option value="USD" className="Option"><CurrencyDollar className="CurrencyDollar" />United States Dollar (USD)</Option>
          </Select>
          <Row className="PricingSet" align="center" justify="center">
            <Input className="PricingMin" placeholder="Min"></Input>
            <div className="BetweenText">to</div>
            <Input className="PricingMax" placeholder="Max"></Input>
          </Row>
          <Row className="ButtonRow">
            <Button className="ApplyButton">Apply</Button>
          </Row>
        </Row>
      </SubMenu>
      <SubMenu className="SubMenu" key="sub2" title="collections">
        <Menu.Item key="3" className="MenuItem">
          Option 5
        </Menu.Item>
        <Menu.Item key="4" className="MenuItem">
          Option 6
        </Menu.Item>
      </SubMenu>
      <SubMenu className="SubMenu" key="sub3" title="categories">
        <Menu.Item key="5" className="MenuItem">
          Option 9
        </Menu.Item>
        <Menu.Item key="6" className="MenuItem">
          Option 10
        </Menu.Item>
        <Menu.Item key="7" className="MenuItem">
          Option 11
        </Menu.Item>
        <Menu.Item key="8" className="MenuItem">
          Option 12
        </Menu.Item>
      </SubMenu>
      <SubMenu className="SubMenu" key="sub4" title="Number of tickets">
        <Menu.Item key="9" className="MenuItem">
          Option 9
        </Menu.Item>
        <Menu.Item key="10" className="MenuItem">
          Option 10
        </Menu.Item>
        <Menu.Item key="11" className="MenuItem">
          Option 11
        </Menu.Item>
        <Menu.Item key="12" className="MenuItem">
          Option 12
        </Menu.Item>
      </SubMenu>
      <SubMenu className="SubMenu" key="sub5" title="reward vs disk">
        <Menu.Item key="13" className="MenuItem">
          Option 9
        </Menu.Item>
        <Menu.Item key="14" className="MenuItem">
          Option 10
        </Menu.Item>
        <Menu.Item key="15" className="MenuItem">
          Option 11
        </Menu.Item>
        <Menu.Item key="16" className="MenuItem">
          Option 12
        </Menu.Item>
      </SubMenu>
      <SubMenu className="SubMenu" key="sub6" title="floor price">
        <Menu.Item key="17" className="MenuItem">
          Option 9
        </Menu.Item>
        <Menu.Item key="18" className="MenuItem">
          Option 10
        </Menu.Item>
        <Menu.Item key="19" className="MenuItem">
          Option 11
        </Menu.Item>
        <Menu.Item key="20" className="MenuItem">
          Option 12
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default MenuBar;

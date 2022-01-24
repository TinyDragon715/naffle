import React from "react";
import {
  Button,
  Input,
  Menu,
  Row,
  Select,
  Slider,
  Checkbox
} from "antd";
import "../css/MenuBar.css";
import { CurrencyDollar } from "react-bootstrap-icons";
import { PUBLIC_PREFIX_PATH } from "config/AppConfig";
import { Link } from "react-router-dom";

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
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      className="MenuBar"
    >
      <Row className="MenuHeader" align="middle">
        <span className="FilterMenu">Filter</span>
      </Row>
      <SubMenu className="SubMenu" key="sub1" title="Floor Price">
        <Row className="SubMenuTool" justify="center">
          <Select
            defaultValue="USD"
            style={{ width: 220 }}
            onChange={handleChange}
            className="CurrencySelect"
          >
            <Option value="USD" className="Option">
              <CurrencyDollar className="CurrencyDollar" />
              United States Dollar (USD)
            </Option>
          </Select>
          <Row className="PricingSet" align="center" justify="center">
            <Checkbox className="HourlyConfirm" />
            <Input className="PricingMin" placeholder="Min"></Input>
            <div className="BetweenText">to</div>
            <Input className="PricingMax" placeholder="Max"></Input>
          </Row>
          <Row className="SliderPrice">
            <Slider
              range={{ draggableTrack: true }}
              style={{
                width: "100%",
              }}
              defaultValue={[20, 50]}
            />
          </Row>
          <Row className="ButtonRow">
            <Button className="ApplyButton">Apply</Button>
          </Row>
        </Row>
      </SubMenu>
      <SubMenu className="SubMenu" key="sub2" title="collections">
        <Menu.Item key="8" className="MenuItem">
          <Select
            showSearch
            placeholder="Select a collection"
            optionFilterProp="children"
            className="ChildrenSearch"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">
              <Link to={`/${PUBLIC_PREFIX_PATH}/explore/singleCard`}>
                Crocodile
              </Link>
            </Option>
            <Option value="lucy">
              <Link to={`/${PUBLIC_PREFIX_PATH}/explore/singleCard`}>
                Flower
              </Link>
            </Option>
            <Option value="tom">
              <Link to={`/${PUBLIC_PREFIX_PATH}/explore/singleCard`}>Boat</Link>
            </Option>
          </Select>
        </Menu.Item>
      </SubMenu>
      <SubMenu className="SubMenu" key="sub3" title="categories">
        <Menu.Item key="9" className="MenuItem">
          <Checkbox className="FilterRectangle"></Checkbox>
          Art
        </Menu.Item>
        <Menu.Item key="10" className="MenuItem">
          <Checkbox className="FilterRectangle"></Checkbox>
          Music
        </Menu.Item>
        <Menu.Item key="11" className="MenuItem">
          <Checkbox className="FilterRectangle"></Checkbox>
          Domain Names
        </Menu.Item>
        <Menu.Item key="12" className="MenuItem">
          <Checkbox className="FilterRectangle"></Checkbox>
          Virtual Worlds
        </Menu.Item>
        <Menu.Item key="12" className="MenuItem">
          <Checkbox className="FilterRectangle"></Checkbox>
          Trading Cards
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default MenuBar;

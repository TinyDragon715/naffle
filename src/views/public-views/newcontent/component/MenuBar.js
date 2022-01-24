import React from "react";
import {
  Button,
  Input,
  Menu,
  Row,
  Select,
  Slider,
  Checkbox,
  Radio
} from "antd";
import "../css/MenuBar.css";
import { ArrowLeftShort, CurrencyDollar } from "react-bootstrap-icons";
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
        <span className="Split"></span>
        <ArrowLeftShort color="white" className="ArrowShortIco" />
      </Row>
      <SubMenu className="SubMenu" key="sub1" title="collections">
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
      <SubMenu className="SubMenu" key="sub2" title="Ticket Price">
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
      <SubMenu className="SubMenu" key="sub4" title="Number of tickets">
        <Radio.Group
          className="ExploreRadioGroup"
        >
          <Menu.Item key="14" className="MenuItem">
            <Radio className="ExploreRadio" value={1}>
              2 - 500
            </Radio>
          </Menu.Item>
          <Menu.Item key="15" className="MenuItem">
            <Radio className="ExploreRadio" value={2}>
              500 - 1000
            </Radio>
          </Menu.Item>
          <Menu.Item key="16" className="MenuItem">
            <Radio className="ExploreRadio" value={3}>1000 - 5000
            </Radio>
          </Menu.Item>
          <Menu.Item key="17" className="MenuItem">
            <Radio className="ExploreRadio" value={4}>
              5000 +
            </Radio>
          </Menu.Item>
        </Radio.Group>
      </SubMenu>
      <SubMenu className="SubMenu" key="sub5" title="Block chain">
        <Menu.Item key="33" className="MenuItem">
          
        </Menu.Item>
      </SubMenu>
      {/* <SubMenu className="SubMenu" key="sub6" title="reward vs risk">
        <Menu.Item key="23" className="MenuItem">
          High Risk
        </Menu.Item>
        <Menu.Item key="24" className="MenuItem">
          Medium Risk
        </Menu.Item>
        <Menu.Item key="25" className="MenuItem">
          Low Risk
        </Menu.Item>
      </SubMenu>

      <SubMenu className="SubMenu" key="sub8" title="floor price">
        <Menu.Item key="33" className="MenuItem">
          Leave blank for now
        </Menu.Item>
      </SubMenu> */}
    </Menu>
  );
};

export default MenuBar;

import React, { useState } from "react";
import "../css/ContentNav.css";
import { Row, Radio, Checkbox } from "antd";
import { GridFill, Grid3x3GapFill } from "react-bootstrap-icons";

import { Select } from "antd";

const { Option } = Select;

const ShowFour = () => {
  if (document.querySelectorAll(".SixGrid").length > 0) {
    document.querySelectorAll(".NftPriceCard").forEach((element, key) => {
      element.classList.remove("SixGrid");
    });
    document.querySelectorAll(".TicketGrid").forEach((element, key) => {
      element.classList.remove("SixGridCover");
    });
  }
  document.querySelectorAll(".NftPriceCard").forEach((element, key) => {
    element.classList.add("FourGrid");
  });
  document.querySelectorAll(".TicketGrid").forEach((element, key) => {
    element.classList.add("FourGridCover");
  });
  document.querySelectorAll(".ExploreCircleImg").forEach((element, key) => {
    element.classList.remove("SixCircle");
    element.classList.add("FourCircle");
  });
};
const ShowSix = () => {
  if (document.querySelectorAll(".FourGrid").length > 0) {
    document.querySelectorAll(".NftPriceCard").forEach((element, key) => {
      element.classList.remove("FourGrid");
    });
    document.querySelectorAll(".TicketGrid").forEach((element, key) => {
      element.classList.remove("FourGridCover");
    });
  }
  document.querySelectorAll(".NftPriceCard").forEach((element, key) => {
    element.classList.add("SixGrid");
  });
  document.querySelectorAll(".TicketGrid").forEach((element, key) => {
    element.classList.add("SixGridCover");
  });
  document.querySelectorAll(".ExploreCircleImg").forEach((element, key) => {
    element.classList.add("SixCircle");
    element.classList.remove("FourCircle");
  });
};
const options = [
  { label: <GridFill onClick={ShowFour} />, value: "GridFill" },
  { label: <Grid3x3GapFill onClick={ShowSix} />, value: "Grid3x3Fill" },
];
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

// function handleChange(value) {
//   console.log(`selected ${value}`);
// }

const ContentNav = () => {
  const [value3, setRadio] = useState("");
  const onChange3 = (e) => {
    console.log("radio3 checked", e.target.value);
    setRadio(e.target.value);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <Row className="ContentNav" align="middle">
      <span className="ExploreContent">Explore Naffles Collections</span>
        <span className="Split"></span>
        <Row className="CreditRow">

          <Checkbox className="Rectangle"></Checkbox>
          <span className="FilterOptions">Verified Collections Only</span>
        </Row>
        {/* <Select
          defaultValue="Allitem"
          style={{ width: 200 }}
          onChange={handleChange}
          className="SizeSelect"
        >
          <Option value="Allitem">All item</Option>
        </Select> */}
        <Select
          defaultValue="Sort By"
          style={{ width: 200 }}
          onChange={handleChange}
          className="DesSelect"
        >
          <Option value="Floor Price (Low to High)">
          Floor Price (Low to High)
          </Option>
          <Option value="Floor Price (High to Low)">
          Floor Price (High to Low)
          </Option>
          <Option value="Alphabetical Ascending">
          Alphabetical Ascending
          </Option>
          <Option value="Alphabetical Descending">
          Alphabetical Descending
          </Option>
        </Select>

        <Radio.Group
          options={options}
          onChange={onChange3}
          value={value3}
          optionType="button"
          className="GridViewRadio"
        />
      </Row>
      <Row className="InputSelectRow">
        {/* <Select
      className="FilterSelect"
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={handleChange}
    >
      {children}
    </Select> */}
      </Row>
    </>
  );
};

export default ContentNav;

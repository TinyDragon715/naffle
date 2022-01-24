import React, { useState } from "react";
import "../css/ContentNav.css";
import { Row, Radio } from "antd";
import { GridFill, Grid3x3GapFill } from "react-bootstrap-icons";

import { Select } from 'antd';

const { Option } = Select;

const options = [
  { label: <GridFill />, value: "GridFill" },
  { label: <Grid3x3GapFill />, value: "Grid3x3Fill" },
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
  }
  return (
    <>
      <Row className="ContentNav" align="middle">
        <span className="ResultsAmount">1,202 results</span>
        <span className="Split"></span>
        <Row className="CreditRow">
          <span className="Rectangle"></span>
          <span className="FilterOptions">Verified Collections Only</span>
        </Row>
        <Select
          defaultValue="Allitem"
          style={{ width: 200 }}
          onChange={handleChange}
          className="SizeSelect"
        >
          <Option value="Allitem">All item</Option>
        </Select>
        <Select
          defaultValue="Sort By"
          style={{ width: 200 }}
          onChange={handleChange}
          className="DesSelect"
        >
          <Option value="Naffles price (Low to High)">Naffles price (Low to High)</Option>
          <Option value="Naffles price (High to Low)">Naffles price (High to Low)</Option>
          <Option value="Ending Soon">Ending Soon</Option>
          <Option value="Most tickets remaining">Most tickets remaining</Option>
          <Option value="Least tickets remaining">Least tickets remaining</Option>
          <Option value="Alphabetical ascending">Alphabetical ascending</Option>
          <Option value="Alphabetical descending">Alphabetical descending</Option>
          <Option value="Recently Listed">Recently Listed</Option>
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
      <Select
      className="FilterSelect"
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={handleChange}
    >
      {children}
    </Select>
      </Row>
    </>
  );
};

export default ContentNav;

import React from "react";
import "../css/ProfileCardList.css";
import { Row } from "antd";

const TransactionList = (props) => {
  const header = props.header;
  const body = props.body;
  return (
    <>
      <Row className="ProfilePriceTableRow">
        <Row className="TranSactionCaption">NAFFLES LIST</Row>
        <table>
          <thead>
            <tr>
              {header.map((item, index) => {
                return <th>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {body.map((item, index) => {
              return (
                <tr>
                  <td>{item.Name}</td>
                  <td>{item.Address}</td>
                  <td>{item.ToWinner}</td>
                  <td>{item.NTS}</td>
                  <td>{item.Price}</td>
                  <td>{item.Time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Row>
    </>
  );
};

export default TransactionList;

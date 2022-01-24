import React from "react";
import "../css/ProfileCardList.css";
import { Row, Avatar } from "antd";

const ProfileCardList = (props) => {
  const header = props.header;
  const body = props.body;
  return (
    <>
      <Row className="ProfilePriceTableRow">
        <Row className="TranSactionCaption">TRANSACTION HISTORY</Row>
        <table>
          <thead>
            <tr>
             {
               header.map((item,index)=>{
                 return(
                   <th>{item}</th>
                 )
               })
             }
            </tr>
          </thead>
          <tbody>
           {
             body.map((item,index)=>{
               return(
                <tr>
                <td>
                  <Avatar src={item.img} />
                </td>
                <td>{item.TransactionID}</td>
                <td>{item.Name}</td>
                <td>{item.ID}</td>
                <td>{item.Number}</td>
                <td>{item.Status}</td>
                <td>{item.Winner}</td>
              </tr>
               )
             })
           }
          </tbody>
        </table>
      </Row>
    </>
  );
};

export default ProfileCardList;

import React from "react";
import "../css/ProfileDataInfo.css";
import { Col, Row } from "antd";
import AvatarCarousel from "./AvatarCarousel";
import { ExploreImage } from "constant/ImageConstant";

const truncate = (str) => {
  return str.substr(0, 6) + "..." + str.substr(str.length - 4, str.length - 1);
};
const ProfileDataInfo = (props) => {
  return (
    <>
      <Col className="UserProfile2">
        <Row className="ProfileCardGrid">
          <AvatarCarousel blockchainData={props.blockchainData}/>
          <Row className="StateBar" justify="center">
            <span className="StateDot"></span>
            <span className="StateDot BlueDot"></span>
            <span className="StateDot"></span>
          </Row>
        </Row>
        <div className="TransactionTest">
          <p className="TestCaption">Referrals</p>
          <p className="TotalRefferals">Total Referrals: $209.52</p>
          <table>
            <tr>
              <th>Date Referred </th>
              <th>ID</th>
              <th>Fees Collected</th>
            </tr>
            <tbody>
              <tr>
                <td>29/12/2021 </td>
                <td>
                  {truncate("0x6777A0ffFAB9D9C4a94342F19F4e9e8f0b13F66f")}
                </td>
                <td>
                  <img
                    alt=""
                    className="PriceImg"
                    src={ExploreImage.NftPriceCard.EyeImg}
                  />
                  0.05 [ <span className="match-usd">$</span> 5.5 ]
                </td>
              </tr>
              <tr>
                <td>29/12/2021 </td>
                <td>
                  {truncate("0x6777A0ffFAB9D9C4a94342F19F4e9e8f0b13F66f")}
                </td>
                <td>
                  <img
                    alt=""
                    className="PriceImg"
                    src={ExploreImage.NftPriceCard.EyeImg}
                  />
                  0.09 [ <span className="match-usd">$</span> 5.5 ]
                </td>
              </tr>
              <tr>
                <td>29/12/2021 </td>
                <td>
                  {truncate("0x6777A0ffFAB9D9C4a94342F19F4e9e8f0b13F66f")}
                </td>
                <td>
                  <img
                    alt=""
                    className="PriceImg"
                    src={ExploreImage.NftPriceCard.EyeImg}
                  />
                  0.05 [ <span className="match-usd">$</span> 5.5 ]
                </td>
              </tr>
            </tbody>
          </table>
          <Row className="StateBar" justify="center">
            <span className="StateDot"></span>
            <span className="StateDot BlueDot"></span>
            <span className="StateDot"></span>
          </Row>
        </div>
        {/* <ProfileCardList header={TransactionHeaderData} body={TransactionBodyData} /> */}
        {/* <TransactionList header={NafflesListHeader} body={NafflesListBody} /> */}
      </Col>
    </>
  );
};

export default ProfileDataInfo;

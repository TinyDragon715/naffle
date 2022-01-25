import { Col } from "antd";
import React from "react";
import "../css/ProfileUserInfo.css";
// import { Avatar } from 'antd';
import { ProfileImage } from "constant/ImageConstant";
import {InfoCircleOutlined} from '@ant-design/icons';

const ProfileUserInfo = () => {
  return (
    <>
      <Col className="MainProfile">
        <img
          alt=""
          className="ProfileImage1"
          src={ProfileImage.ProfileUserInfo.ProfileUserAvatar1}
        />
        <span className="BigUsername">
          JXSmith123
          <span className="EditLogo">
          <img alt="Edit" className="EditLogoImg" src={ProfileImage.ProfileUserInfo.EditLogo} />
          </span>
        </span>
        <span className="UsernameEmail">jsmith@gmail.com</span>
        <span className="CompanyCom">naffles129491reffereal.com</span>
        <span className="LinkDes">refferal link</span>
        <InfoCircleOutlined className="UserInfoIcon" />
      </Col>
    </>
  );
};

export default ProfileUserInfo;

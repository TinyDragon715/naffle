import React from "react";
import PageHeader from "components/Header/PageHeader";

import CoverSection from "./component/CoverSection";
import NftAbout from "./component/NftAbout";
import CoverSystem from "./component/CoverSystem";
import StartSelling from "./component/StartSelling";
import PageFooter from "components/Footer/PageFooter";
// import AvatarCarousel from "./component/AvatarCarousel";
// import WalletMenu from "./component/WalletMenu";


const HomeView = () => {
  return (
    <>
      <PageHeader theme="white" />
      <CoverSection/>
      <NftAbout/>
      <CoverSystem/>
      {/* <AvatarCarousel/>  */}
      <StartSelling/>
      <PageFooter/>
    </>
  );
};

export default HomeView;

import React from "react";
import "../css/SmallCarousel.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { CarouselData, Shortresponsive } from "data/CarouselData";
import { ExploreImage } from "constant/ImageConstant";

const truncate = (str) => {
  return str.substr(0,6)+"..."+str.substr(str.length-4,str.length-1);
}

const AvatarCarousel = () => {
  return (
    <>
      <div className="ShortCarouselRow">
        <Carousel
          autoPlay
          className="ShortCarousel"
          responsive={Shortresponsive}
          infinite
        >
          {CarouselData.map((post, indx) => {
            return (
              <div className="Shortcard text-left mt-5" key={indx}>
                <div className="ShortCardImgCover">
                  <img
                    style={{ height: "400px", width: "400px" }}
                    src={post.img}
                    alt="Alttext"
                    draggable="false"
                    className="ShortBlogger"
                  />
                </div>
                {/* <img alt="" className="ShortCenterCircle" src={post.img} /> */}
                <div className="Short-body">
                  <div className="Shortcard-title">
                    <span>{post.Caption}</span>
                  </div>
                  <div className="Shortcard-text">{truncate(post.Remain)}</div>
                  {/* <div className="Shortcard-price">{post.Price}</div> */}
                  <div className="SlideStatusBar">
                    <div className="SystemLeftStatus">
                      <span className="ShortColText Rspace">FLOOR PRICE</span>
                      <span className="ShortColLeft"><img alt="" className="PriceImg" src={ExploreImage.NftPriceCard.EyeImg} /> 2.69</span>
                    </div>
                    <span className="Split"></span>
                    <div className="SystemPriceStautsRead">
                      <span className="TFText">TICKETS FROM</span>
                      <span className="PriceEthH">
                        <span className="EthPrice"><img alt="" className="PriceImg" src={ExploreImage.NftPriceCard.EyeImg} /> 0.005</span>
                        {/* <img alt="EthImage" className="EthImage" src={ExploreImage.NftPriceCard.WhiteArrow}/> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default AvatarCarousel;

import React from "react";
import "../css/AvatarCarousel.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import {Row} from 'antd';
import "../css/AvatarCarousel.css";
import { HomeCarouselData,HomeResponsive } from "data/CarouselData";
import { ExploreImage } from "constant/ImageConstant";

import {PUBLIC_PREFIX_PATH} from 'config/AppConfig';
import {Link} from "react-router-dom"

const AvatarCarousel = () => {
  return (
    <>
      <div className="HomeCarouselRow">
        {/* <Row justify="center" className="HomeBNBCCaption">
                  Browse Naffles By Category
                  </Row> */}
        <Carousel className="HomeCarousel" responsive={HomeResponsive} infinite>
          {HomeCarouselData.map((post, indx) => {
            return (
              <Link to={`/${PUBLIC_PREFIX_PATH}/explore/singleCard`}>
              <div className="Homecard text-left mt-5" key={indx}>

                <div className="HomeCardImgCover">
                <img
                  style={{ height: "400px",width:"400px"}}
                  src={post.img}
                  alt="Alt text"
                  draggable="false"
                  className="HomeBlogger"
                  />
                  </div>
                  <img alt="" className="HomeCenterCircle" src={post.img} />
                <div className="Homecard-body">
                  <h5 className="Homecard-title">{post.Caption}</h5>
                  <div className="UpdateCardText">
                    <div className="UpdateTP Col">
                      <span className="TLLeft">Ticket price</span>
                      <span className="TLtext"><img alt="" className="PriceImg" src={ExploreImage.NftPriceCard.EyeImg} /> 0.005<span className="usd-price">( $16 )</span></span>
                    </div>
                    <span className="Split"></span>
                    <div className="UpdateTL ColLeft">
                    <span className="TLLeft">Tickets Left</span>
                      <span className="TLtext">68 / 150</span>
                    </div>
                  </div>
                  {/* <div className="Homecard-text">
                    {
                      post.Remain
                    }
                  </div>
                  <div className="Homecard-price">
                    {
                      post.Price
                    }
                  </div> */}
                </div>
              </div>
                    </Link>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default AvatarCarousel;

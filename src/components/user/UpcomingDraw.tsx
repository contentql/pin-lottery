import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Slider from "react-slick";
import circle_border from "/public/images/elements/circle-border.png";

import "slick-carousel/slick/slick.css";

const NextBtn = ({ onClick }) => {
  return (
    <button
      type="button"
      className="d-flex align-items-center justify-content-center slick-arrow prev"
      onClick={onClick}
    >
      <BsArrowLeft />
    </button>
  );
};

const PrevBtn = ({ onClick }) => {
  return (
    <button
      type="button"
      className="d-flex align-items-center justify-content-center slick-arrow next"
      onClick={onClick}
    >
      <BsArrowRight />
    </button>
  );
};

const UpcomingDraw = () => {
  const settings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,
    speed: 700,
    arrows: true,
    dots: false,
    prevArrow: <NextBtn />,
    nextArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="upcoming-draw-wrapper">
      <h3 className="title">Upcoming Draw</h3>
      <Slider {...settings} className="draw-ticket-slider">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div key={i} className="silgle">
            <div className="draw-single-ticket">
              <div className="draw-single-ticket__header">
                <div className="left">Tickey#1</div>
                <div className="right">Contest No:R9D</div>
              </div>
              <div className="circle-divider">
                <Image src={circle_border} alt="circle border" />
              </div>
              <ul className="ticket-numbers-list">
                <li>23</li>
                <li>22</li>
                <li>19</li>
                <li>9</li>
                <li>50</li>
                <li>11</li>
                <li>12</li>
              </ul>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default UpcomingDraw;

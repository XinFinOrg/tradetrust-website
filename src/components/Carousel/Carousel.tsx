import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { Youtube, Button, ButtonSize } from "@govtechsg/tradetrust-ui-components";
import ReactMarkdown from "react-markdown";
import { ButtonVideo } from "../ButtonVideo";

import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "./swiper-custom.css";

interface HomeCarouselSlide {
  title: string;
  subheader?: string;
  description: string;
  backgroundImage?: string;
  buttonYoutube?: {
    title: string;
    youtubeId: string;
  };
  buttonPage?: {
    label: string;
    route: string;
  };
  buttonDownload?: {
    label: string;
    file: string;
  };
}

interface CarouselProps {
  slides: HomeCarouselSlide[];
}

export const Carousel: FunctionComponent<CarouselProps> = ({ slides }) => {
  return (
    <Swiper
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      pagination={{
        clickable: true,
        bulletActiveClass: "opacity-100 bg-cloud-800",
      }}
      modules={[Autoplay, Pagination]}
      autoHeight={true}
    >
      {slides.map((slide: HomeCarouselSlide, index: number) => {
        const { title, subheader, description, backgroundImage, buttonYoutube, buttonPage, buttonDownload } = slide;
        const hasCta = buttonYoutube || buttonPage || buttonDownload;
        const styleSlide = backgroundImage ? { backgroundImage: `url("${backgroundImage}")` } : {};

        return (
          <SwiperSlide
            key={`slide-${index}`}
            style={styleSlide}
            className="bg-no-repeat bg-[length:100%] md:bg-[length:50%] bg-bottom md:bg-right py-16 md:py-32 2xl:py-48"
            data-testid="slide"
          >
            <div className="container">
              <div className="flex flex-wrap">
                <div className="md:w-1/2 2xl:w-2/5">
                  <div className="text-center md:text-left">
                    <h1 className="my-2 font-ubuntu text-6xl leading-none">{title}</h1>
                    <div className="md:w-[85%]">
                      {subheader && <h3 className="my-4">{subheader}</h3>}
                      <ReactMarkdown
                        className="my-4 text-base leading-5"
                        components={{ p: ({ ...props }) => <p className={"mb-2 break-word"} {...props} /> }}
                      >
                        {description}
                      </ReactMarkdown>
                    </div>
                  </div>
                  {hasCta && (
                    <div className="flex flex-wrap items-center justify-center md:justify-start">
                      {buttonYoutube && (
                        <ButtonVideo className="mr-2">
                          <Youtube title={buttonYoutube.title} youtubeId={buttonYoutube.youtubeId} />
                        </ButtonVideo>
                      )}
                      {buttonPage && (
                        <Link to={buttonPage.route} data-testid="verify-button">
                          <Button size={ButtonSize.LG} className="text-white bg-cerulean-500 hover:bg-cerulean-800">
                            <h4>{buttonPage.label}</h4>
                          </Button>
                        </Link>
                      )}
                      {buttonDownload && (
                        <a href={buttonDownload.file} download>
                          <Button size={ButtonSize.LG} className="text-white bg-cerulean-500 hover:bg-cerulean-800">
                            {buttonDownload.label}
                          </Button>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="h-56 md:h-0" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

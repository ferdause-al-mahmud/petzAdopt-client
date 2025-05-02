import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";

const Banner = () => {
  return (
    <div>
      <Swiper
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper rounded-sm md:rounded-lg"
      >
        <SwiperSlide>
          <section className="bg-gray-100 text-gray-800">
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
              <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                <h1 className="text-2xl font-bold leading-none sm:text-6xl">
                  <span className="text-[#ff946b]">Welcome </span>to PetzAdopt
                </h1>
                <p className="mt-6 mb-8 text-lg sm:mb-12">
                  🐾 Find Your Perfect Companion Today 🐾
                  <br />
                  we{"'"}re dedicated to matching loving pets with caring
                  families.
                </p>
              </div>
              <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                <img
                  src="https://i.ibb.co/4TpnMTm/banner-dog.jpg"
                  alt=""
                  className="rounded-md object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
                />
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="bg-gray-100 text-gray-800">
            <div className="container flex flex-col justify-center p-6 sm:mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
              <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                <h1 className="text-2xl font-bold leading-none sm:text-5xl">
                  Adopt,
                  <span className="text-[#ff946b]">Don{"'"}t Shop </span>
                </h1>
                <p className="mt-6 mb-8 text-lg sm:mb-12">
                  {" "}
                  Let{"'"}s Create Happy Tails Together!
                  <br className="" />
                  Your new best friend is waiting for you here. Explore our
                  available pets and bring home unconditional love today! 🐶🐱🐰
                </p>
              </div>
              <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                <img
                  src="https://i.ibb.co/Cs7p4BX/banner-cat.jpg"
                  alt=""
                  className="h-72 object-contain sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
                />
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="bg-gray-100 text-gray-800">
            <div className="container flex flex-col justify-center p-6 sm:mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
              <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                <h1 className="text-2xl font-bold leading-none sm:text-5xl">
                  Get your,
                  <span className="text-[#ff946b]">Companion</span>
                </h1>
                <p className="mt-6 mb-8 text-lg sm:mb-12">
                  {" "}
                  Loyal and loving, our dogs are eager to become your faithful
                  companion, Discover your new best friend now.
                </p>
              </div>
              <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                <img
                  src="https://i.ibb.co/TvDQ3zQ/puppy.jpg"
                  alt=""
                  className="h-72 object-contain sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
                />
              </div>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;

import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import TestimonialsSkeleton from "../../Components/Skeleton/TestimonialsSkeleton";

const Testimonials = () => {
    const axiosCommon = useAxiosCommon();
    const { data: testimonials = [], isLoading } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/testimonials`)
            return data
        },
    })
    console.log(testimonials)

    return (
        <div className="max-w-7xl mx-auto py-12">
            <h1 className="text-2xl sm:text-5xl font-bold text-center mb-8">Testimonials</h1>
            <p className="text-xl font-medium mt-8 sm:w-1/2 mx-auto text-center sm:mb-12">What Our People’s Say About PetzAdopt</p>
            <div className="flex gap-6 flex-col items-center md:flex-row">
                <div className="md:w-1/2  p-4 md:p-8 lg:p-12 flex-shrink-0">
                    <img src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1153836586.jpg?crop=0.555xw:0.834xh;0.228xw,0&resize=2048:*" className="rounded-lg w-full" />
                </div>
                <div className="w-full md:w-1/2 ">
                    {
                        isLoading ?
                            <TestimonialsSkeleton></TestimonialsSkeleton>
                            : <Swiper
                                loop={true}
                                spaceBetween={30}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 1000,
                                    disableOnInteraction: false,
                                }}
                                navigation={false}
                                modules={[Autoplay, Navigation]}
                                className="mySwiper rounded-sm md:rounded-lg"
                            >
                                {testimonials.map((testimonial, index) => (
                                    <SwiperSlide key={index}>
                                        <section className="bg-gray-100 w-full text-gray-800">
                                            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24">
                                                <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                                                    <img src={testimonial.profile_picture} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto lg:mx-0 mb-4" />
                                                    <h2 className="text-xl font-semibold">{testimonial.name}</h2>
                                                    <p className="mt-4 mb-8 text-lg">{testimonial.testimonial}</p>
                                                    <div className="flex justify-center lg:justify-start">
                                                        {Array.from({ length: testimonial.stars }).map((_, starIndex) => (
                                                            <svg key={starIndex} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M10 15l-6.09 3.26L5 13l-5-4.91L6.45 7.1 10 1.5l3.55 5.59L20 8l-5 4.91.91 5.26L10 15z"></path>
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                    }

                </div>
            </div>

        </div>
    );
};

export default Testimonials;
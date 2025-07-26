/* eslint-disable react/prop-types */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import TestimonialsSkeleton from "../../Components/Skeleton/TestimonialsSkeleton";
import { Star, User, Mail, MessageCircle, Send, Plus, X, CheckCircle, Heart } from "lucide-react";

const Testimonials = () => {
  const axiosCommon = useAxiosCommon();
  const queryClient = useQueryClient();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    testimonial: "",
    stars: 5,
    profile_picture: "",
  });

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/testimonials`);
      return data;
    },
  });

  // Mutation for submitting new testimonial
  const submitTestimonialMutation = useMutation({
    mutationFn: async (testimonialData) => {
      const { data } = await axiosCommon.post("/testimonials", testimonialData);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch testimonials
      queryClient.invalidateQueries(["testimonials"]);
      
      // Reset form
      setNewReview({
        name: "",
        email: "",
        testimonial: "",
        stars: 5,
        profile_picture: "",
      });
      
      // Show thank you message
      setShowThankYou(true);
      setShowReviewForm(false);
      setIsSubmitting(false);
      
      // Hide thank you message after 5 seconds
      setTimeout(() => {
        setShowThankYou(false);
      }, 5000);
    },
    onError: (error) => {
      console.error("Error submitting testimonial:", error);
      setIsSubmitting(false);
    },
  });

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.email || !newReview.testimonial) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Generate a default profile picture URL if none provided
    const testimonialData = {
      ...newReview,
      profile_picture:
        newReview.profile_picture ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          newReview.name
        )}&background=random&color=fff&size=200`,
    };

    submitTestimonialMutation.mutate(testimonialData);
  };

  const handleNewReview = () => {
    setShowReviewForm(!showReviewForm);
    setShowThankYou(false);
  };

  const StarRating = ({ rating, interactive = false, onChange }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 ${
              star <= rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            } ${
              interactive
                ? "cursor-pointer hover:text-yellow-400 transition-colors"
                : ""
            }`}
            onClick={() => interactive && onChange && onChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-2xl sm:text-5xl font-bold text-center mb-8">
        Testimonials
      </h1>
      <p className="text-xl font-medium mt-8 sm:w-1/2 mx-auto text-center sm:mb-12">
        What Our People{"'"}s Say About PetzAdopt
      </p>

      {/* Add Review Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleNewReview}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          {showReviewForm ? (
            <>
              <X className="w-5 h-5" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Share Your Experience
            </>
          )}
        </button>
      </div>

      {/* Thank You Message */}
      {showThankYou && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl shadow-xl p-8 mb-12 max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Thank You For Your Feedback!
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            We appreciate you taking the time to share your experience with PetzAdopt.
          </p>
          <p className="text-lg text-gray-500 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Your testimonial helps other pet lovers discover our platform
          </p>
          <div className="mt-6 text-sm text-gray-400">
            This message will disappear in a few seconds...
          </div>
        </div>
      )}

      {/* Review Submission Form */}
      {showReviewForm && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Share Your PetzAdopt Experience
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={newReview.email}
                  onChange={(e) =>
                    setNewReview({ ...newReview, email: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Profile Picture URL (Optional)
              </label>
              <input
                type="url"
                value={newReview.profile_picture}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    profile_picture: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/your-photo.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Leave empty to use a generated avatar
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <Star className="inline w-4 h-4 mr-2" />
                Rating
              </label>
              <StarRating
                rating={newReview.stars}
                interactive={true}
                onChange={(rating) =>
                  setNewReview({ ...newReview, stars: rating })
                }
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <MessageCircle className="inline w-4 h-4 mr-2" />
                Your Testimonial *
              </label>
              <textarea
                value={newReview.testimonial}
                onChange={(e) =>
                  setNewReview({ ...newReview, testimonial: e.target.value })
                }
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your experience with PetzAdopt - adoption, donations, or posting pets..."
                required
              />
            </div>

            <button
              onClick={handleSubmitReview}
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Testimonial
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Existing Testimonials Display */}
      <div className="flex gap-6 flex-col items-center md:flex-row">
        <div className="md:w-1/2 p-4 md:p-8 lg:p-12 flex-shrink-0">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1153836586.jpg?crop=0.555xw:0.834xh;0.228xw,0&resize=2048:*"
            className="rounded-lg w-full"
            alt="Happy pets"
          />
        </div>
        <div className="w-full md:w-1/2">
          {isLoading ? (
            <TestimonialsSkeleton />
          ) : (
            <Swiper
              loop={true}
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
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
                      <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-lg lg:text-left">
                        <img
                          src={testimonial.profile_picture}
                          alt={testimonial.name}
                          className="w-24 h-24 rounded-full mx-auto lg:mx-0 mb-4 object-cover"
                        />
                        <h2 className="text-xl font-semibold">
                          {testimonial.name}
                        </h2>
                        <p className="mt-4 mb-8 text-lg">
                          {testimonial.testimonial}
                        </p>
                        <div className="flex justify-center lg:justify-start">
                          {Array.from({ length: testimonial.stars }).map(
                            (_, starIndex) => (
                              <svg
                                key={starIndex}
                                className="w-6 h-6 text-yellow-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-6.09 3.26L5 13l-5-4.91L6.45 7.1 10 1.5l3.55 5.59L20 8l-5 4.91.91 5.26L10 15z"></path>
                              </svg>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
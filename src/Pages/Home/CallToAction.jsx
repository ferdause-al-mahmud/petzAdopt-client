import { motion } from "framer-motion";

const CallToAction = () => {
  const cards = [
    {
      title: "Join Us in Saving Lives",
      description:
        "Support our mission and adopt a pet. Together, we can make a positive impact on pet welfare. Your love and care can turn a shelter pet into a beloved family member.",
      image:
        "https://images.squarespace-cdn.com/content/v1/5acd6d2a3e2d09e44728ddca/1613165522317-CYS88RTAXHW5C8P0IQFH/IMG_7932.jpg",
    },
    {
      title: "Discover Unconditional Love",
      description:
        "Welcome a pet into your family and experience the joy of unconditional love. Adopt today and give a pet the forever home they have been dreaming of. Their gratitude will fill your heart with endless warmth.",
      image:
        "https://todaysparent.mblycdn.com/tp/resized/2024/02/1600x1200/Article-Photos-4.png",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <motion.div
        className="text-center mb-12 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 text-gray-800">
          Make a Difference Today
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Support our mission by adopting a pet or contributing to our donation
          campaigns. Together, we can change lives!
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        {/* Hero Image Card */}
        <motion.div
          className="relative group overflow-hidden rounded-2xl shadow-xl mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <img
            src="https://blog.byjasco.com/hs-fs/hubfs/Different%20Types%20of%20Pets.jpg?width=3051&name=Different%20Types%20of%20Pets.jpg"
            alt="Pets Banner"
            className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-rose-100 !text-rose-900/20 flex flex-col justify-center items-center text-center p-8 transition-all duration-500">
            <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-black mb-4">
              Make a Difference with Your Donation
            </h3>
            <p className="text-md md:text-lg text-white group-hover:text-black max-w-xl">
              Your donation provides vital care to pets in need. Every
              contribution, big or small, creates hope.
            </p>
          </div>
        </motion.div>

        {/* Two Cards Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: -50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: index * 0.2 },
                },
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-rose-100 !text-rose-900/20 flex flex-col justify-center items-center text-center p-8 transition-all duration-500">
                <h3 className="text-2xl font-bold text-white group-hover:text-black mb-4">
                  {card.title}
                </h3>
                <p className="text-md text-white group-hover:text-black">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

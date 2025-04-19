
const CallToAction = () => {
    return (
        <section className="py-24">
            <h1 className="text-2xl sm:text-5xl font-bold text-center mb-8">Call to action</h1>
            <p className="text-lg mt-8 sm:w-1/2 mx-auto text-center sm:mb-12">Support our mission and adopt a pet, Join our efforts to help pets in need. Contribute to our donation campaigns and make a difference in their lives. Your support can provide food, shelter, and medical care to pets in need.</p>
            <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
                <div className="md:relative mb-6">
                    <div>
                        <img src="https://blog.byjasco.com/hs-fs/hubfs/Different%20Types%20of%20Pets.jpg?width=3051&name=Different%20Types%20of%20Pets.jpg" alt="" />
                    </div>
                    <div className="md:absolute top-0 right-0 bg-black hover:bg-[#ff946b] hover:bg-opacity-60 bg-opacity-60 h-full hover:delay-100 hover:transition-all">
                        <div className="flex flex-col text-white hover:text-black justify-center items-center h-full">
                            <h3 className="text-xl md:text-2xl font-bold mb-4">Make a Difference with Your Donation</h3>
                            <div>
                                <p className="text-md md:text-lg w-[70%] mx-auto mb-4">
                                    Your donation can provide essential care to pets in shelters. Support our campaigns to give pets the medical attention, food, and comfort they need. Every donation, big or small, makes an impact.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-1 flex-col md:relative items-center gap-4 mb-12">
                        <div className="">
                            <img src="https://images.squarespace-cdn.com/content/v1/5acd6d2a3e2d09e44728ddca/1613165522317-CYS88RTAXHW5C8P0IQFH/IMG_7932.jpg" alt="Image 1" className="w-full h-auto rounded-md shadow-md" />
                        </div>
                        <div className="bg-black hover:bg-[#ff946b] hover:bg-opacity-60 bg-opacity-60 h-full hover:delay-100 hover:transition-all md:absolute">
                            <div className="flex flex-col text-white hover:text-black  justify-center items-center h-full">
                                <h3 className="text-xl md:text-2xl font-bold mb-4">Join Us in Saving Lives</h3>
                                <p className="text-md px-4 mb-4">
                                    Support our mission and adopt a pet. Together, we can make a positive impact on pet welfare. Your love and care can turn a shelter pet into a beloved family member.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col md:relative items-center gap-4 mb-12">
                        <div className="flex w-full h-full">
                            <img src="https://todaysparent.mblycdn.com/tp/resized/2024/02/1600x1200/Article-Photos-4.png" alt="Image 1" className="w-full h-full object-cover rounded-md shadow-md" />
                        </div>
                        <div className="bg-black hover:bg-[#ff946b] hover:bg-opacity-60 bg-opacity-60 h-full hover:delay-100 hover:transition-all md:absolute">
                            <div className="flex flex-col text-white hover:text-black  justify-center items-center h-full">
                                <h3 className="text-xl md:text-2xl font-bold mb-4">Discover Unconditional Love</h3>
                                <p className="text-md px-4 mb-4">
                                    Welcome a pet into your family and experience the joy of unconditional love. Adopt today and give a pet the forever home they have been dreaming of. Their gratitude will fill your heart with endless warmth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;

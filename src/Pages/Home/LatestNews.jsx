const LatestNews = () => {
    return (
        <section className="max-w-7xl mx-auto py-6 sm:py-12 text-gray-800">
            <div className="container p-6 mx-auto space-y-8">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl sm:text-5xl font-bold text-center">Latest News</h1>
                    <p className="text-lg mt-8 sm:w-[70%] mx-auto text-center sm:mb-12">
                        Thinking about adopting a pet for the first time? We{"'"}ve got you covered with expert advice and practical tips to make your journey smooth and enjoyable. Learn about pet-proofing your home.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                    <article className="flex flex-col bg-gray-50">
                        <div className="sm:h-[60%]">
                            <img className="w-full h-full object-cover bg-gray-500" src="https://i.ibb.co/jgG3tdy/news1.jpg" />
                        </div>
                        <div className="sm:h-[40%] flex flex-col flex-1 p-6">
                            <p className="text-xs tracking-wider uppercase hover:underline text-indigo-600">Pet Adoption</p>
                            <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">Booming Trend: Adopting Dogs</h3>
                            <p className="mt-2">Discover why adopting dogs is becoming increasingly popular and how you can join this heartwarming trend. Learn about the benefits of giving a dog a forever home.</p>
                            <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-600">
                                <span>June 1, 2023</span>
                                <span>2.1K views</span>
                            </div>
                            <div className="mt-4"><button className="btn bg-[#ff946b] text-white py-2 px-4 rounded">Read more</button></div>
                        </div>
                    </article>
                    <article className="flex flex-col bg-gray-50">
                        <div className="sm:h-[60%]">
                            <img className="w-full h-full object-cover bg-gray-500" src="https://i.ibb.co/vHHjwXP/news2.jpg" />
                        </div>
                        <div className="sm:h-[40%] flex flex-col flex-1 p-6">
                            <p className="text-xs tracking-wider uppercase hover:underline text-indigo-600">Pet Care</p>
                            <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">Essential Tips Before Adopting a Pet</h3>
                            <p className="mt-2">Before you bring a new pet home, there are several important considerations. Get expert advice on preparing your home and lifestyle for your new furry friend.</p>
                            <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-600">
                                <span>June 2, 2023</span>
                                <span>2.2K views</span>
                            </div>
                            <div className="mt-4"><button className="btn bg-[#ff946b] text-white py-2 px-4 rounded">Read more</button></div>
                        </div>
                    </article>
                    <article className="flex flex-col bg-gray-50">
                        <div className="sm:h-[60%]">
                            <img className="w-full h-full object-cover bg-gray-500" src="https://i.ibb.co/9NZYvqH/news3.jpg" />
                        </div>
                        <div className="sm:h-[40%] flex flex-col flex-1 p-6">
                            <p className="text-xs tracking-wider uppercase hover:underline text-indigo-600">Campaigns</p>
                            <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">Your Donations are Feeding Pets in Need</h3>
                            <p className="mt-2">Learn how your generous donations are providing food and care for homeless pets. Discover stories of how you’ve made a difference in their lives.</p>
                            <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-600">
                                <span>June 3, 2023</span>
                                <span>2.3K views</span>
                            </div>
                            <div className="mt-4"><button className="btn bg-[#ff946b] text-white py-2 px-4 rounded">Read more</button></div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;

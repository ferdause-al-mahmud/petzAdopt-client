import { FaCheck } from "react-icons/fa";

const AboutUs = () => {
    return (
        <div className="my-12 px-4 lg:px-0">
            <h1 className="text-2xl sm:text-5xl font-bold text-center mb-8">About us</h1>
            <p className="text-lg mt-8 sm:w-1/2 mx-auto text-center sm:mb-12">
                Welcome to PetzAdopt, your trusted platform for finding and giving a loving home to pets. We are dedicated to connecting pets with caring owners and supporting pet welfare through adoption and donation campaigns.
            </p>
            <section className="max-w-7xl mx-auto text-gray-800">
                <div className="container flex flex-col-reverse mx-auto lg:flex-row">
                    <div className="flex flex-col px-6 py-8 space-y-6 rounded-lg sm:p-8 lg:p-12 lg:w-1/2 xl:w-2/5 bg-[#ff946b] text-gray-50">
                        <div className="flex space-x-2 sm:space-x-4">
                            <FaCheck className="text-3xl" />
                            <div className="space-y-2">
                                <p className="text-xl sm:text-2xl  font-medium leading-snug">Adopt Your Perfect Pet</p>
                                <p className="leading-snug text-slate-100">Explore a wide range of pets waiting for a loving home. Use our simple adoption process to find your new best friend.</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 sm:space-x-4">
                            <FaCheck className="text-3xl" />
                            <div className="space-y-2">
                                <p className="text-xl sm:text-2xl  font-medium leading-snug">Support Donation Campaigns</p>
                                <p className="leading-snug">Join our efforts to help pets in need. Contribute to our donation campaigns and make a difference in their lives.</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 sm:space-x-4">
                            <FaCheck className="text-3xl" />
                            <div className="space-y-2">
                                <p className="text-xl sm:text-2xl  font-medium leading-snug">Add Pets for Adoption</p>
                                <p className="leading-snug">Have a pet that needs a new home? List them on our platform and connect with potential adopters easily.</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 sm:space-x-4">
                            <FaCheck className="text-3xl" />
                            <div className="space-y-2">
                                <p className="text-xl sm:text-2xl  font-medium leading-snug">Manage Your Donations</p>
                                <p className="leading-snug">Keep track of your contributions and see the impact you{"'"}re making. View your donation history and campaign updates.</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 sm:space-x-4">
                            <FaCheck className="text-3xl" />
                            <div className="space-y-2">
                                <p className="text-xl sm:text-2xl  font-medium leading-snug">Join Our Community</p>
                                <p className="leading-snug">Become a part of our supportive community. Share stories, tips, and connect with fellow pet lovers and adopters.</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 xl:w-3/5 ">
                        <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
                            <img src="https://i.ibb.co/PG73Z32/about-us.png" alt="" className="rounded-lg aspect-auto " />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
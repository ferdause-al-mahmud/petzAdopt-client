
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PetDetailSkeleton = () => {
    return (
        <div className="mt-16">
            <section className="bg-gray-100 text-gray-800">
                <div className="container flex flex-col justify-center p-6 gap-6 sm:py-12 lg:py-24 md:flex-row">
                    <div className="flex md:w-1/2 items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <Skeleton width={320} height={400} />
                    </div>
                    <div className="flex space-y-4 flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-3xl capitalize sm:text-5xl font-bold">
                            <Skeleton width="70%" />
                        </h1>
                        <p className="text-xl">
                            <Skeleton count={3} />
                        </p>
                        <div className="flex text-xl flex-col sm:flex-row gap-6">
                            <p className="text-green-500">
                                <span className="font-semibold text-black">Age:</span> <Skeleton width="50%" />
                            </p>
                            <p className="text-blue-600">
                                <span className="font-semibold text-black">Location:</span> <Skeleton width="50%" />
                            </p>
                        </div>
                        <div>
                            <Skeleton width="100%" height="3rem" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PetDetailSkeleton;

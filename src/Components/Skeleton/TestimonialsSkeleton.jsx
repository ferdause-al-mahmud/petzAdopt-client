import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TestimonialsSkeleton = () => {
    return (
        <div className="w-full p-6">
            <div className="bg-gray-100 p-6 rounded-sm lg:rounded-lg">

                <Skeleton circle={true} height={96} width={96} className="mx-auto lg:mx-0 mb-4" />
                <h2 className="text-xl font-semibold">
                    <Skeleton width={150} />
                </h2>
                <p className="mt-4 mb-8 text-lg">
                    <Skeleton count={3} />
                </p>
                <div className="flex justify-center lg:justify-start">
                    <Skeleton width={120} height={24} />
                </div>
            </div>
        </div>
    );
}

export default TestimonialsSkeleton;

import Skeleton from 'react-loading-skeleton'

const CardSkeleton = () => {
    return (
        <div>
            <div className="post  flex-col">
                <div className="left-col gap-4  items-center">
                    <div className="avatar h-[150px] !w-1/2">
                        <Skeleton
                            square
                            height="100%"
                            width="100%"
                            containerClassName="avatar-skeleton"
                        />
                    </div>
                    <div className="user-name w-1/2">
                        {<Skeleton count={3} />}
                    </div>
                </div>
                <div className="right-col">
                    <h3><Skeleton height={50} /> </h3>
                    <h3><Skeleton height={30} /> </h3>
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;
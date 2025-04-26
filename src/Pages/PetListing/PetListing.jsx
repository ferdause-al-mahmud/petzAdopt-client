import { Helmet } from "react-helmet-async";
import { FaFilter } from "react-icons/fa";
import PetListCard from "../../Components/Cards/PetListCard";
import { useInfiniteQuery } from '@tanstack/react-query'
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useEffect, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css'
import CardSkeleton from "../../Components/Skeleton/CardSkeleton";
import InfiniteScroll from 'react-infinite-scroll-component';
const PetListing = () => {
    const queryParams = new URLSearchParams(location.search);
    const axiosCommon = useAxiosCommon();
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const ITEMS_PER_PAGE = 6;
    const initialFilter = queryParams.get('category') || '';

    const fetchPets = async ({ pageParam = 0 }) => {
        const { data } = await axiosCommon.get(`/pets?category=${filter}&name=${search}&limit=${ITEMS_PER_PAGE}&offset=${pageParam}`);
        return { pets: data, nextPage: pageParam + ITEMS_PER_PAGE };
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ['pets', filter, search],
        queryFn: fetchPets,
        getNextPageParam: (lastPage) => lastPage.pets.length === ITEMS_PER_PAGE ? lastPage.nextPage : undefined,
    });

    const handleFilterChange = (event) => {
        const selectedFilter = event.target.value;
        // console.log('Selected filter:', selectedFilter);
        setFilter(selectedFilter);
    };
    useEffect(() => {
        setFilter(initialFilter);
    }, [initialFilter]);

    return (
        <div className="relative">
            <Helmet>
                <title>PetzAdopt | PetListing</title>
            </Helmet>
            <div className="my-12 max-w-7xl mx-auto">
                <h1 className="text-2xl mb-6 sm:text-5xl font-bold text-center">List of pets</h1>
                <div className="flex gap-4 sm:justify-around items-center px-2">
                    <div className="flex items-center gap-2 sm:gap-6">

                        <label className="sm:text-2xl mb-2 font-bold"><FaFilter /></label>
                        <select
                            id="category"
                            value={filter}
                            onChange={handleFilterChange}
                            className="p-4 bg-[#ff946b] rounded-md text-base sm:text-lg md:text-xl lg:text-2xl"
                        >
                            <option value="">All</option>
                            <option value="cat">Cat</option>
                            <option value="dog">Dog</option>
                            <option value="parrot">Parrot</option>
                            <option value="rabbit">Rabbit</option>
                            <option value="fish">Fish</option>
                            <option value="hamster">Hamster</option>
                        </select>

                    </div>
                    <div>
                        <label className="input border-[#ff946b] border flex items-center gap-2">
                            <input
                                type="text"
                                className=" w-[100px] sm:w-auto grow "
                                placeholder="Search"
                                onChange={e => setSearch(e.target.value)}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </label>
                    </div>
                </div>
                {isLoading ? <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    {
                        Array(6).fill().map((_, index) => (
                            <CardSkeleton key={index} />
                        ))
                    }
                </div> : <InfiniteScroll
                    dataLength={data.pages.flat().length}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={<div className=" mt-6 flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span>
                    </div>}

                >
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.pages.flat().map((page) =>
                            page.pets.map((pet, index) => (
                                <PetListCard key={index} pet={pet} />
                            ))
                        )}
                    </div>

                </InfiniteScroll>}


            </div>

        </div>

    );
};

export default PetListing;
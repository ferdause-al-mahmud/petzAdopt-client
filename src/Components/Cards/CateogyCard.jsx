/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const CateogyCard = ({ url, category }) => {
    const categoryFilter = category.toLowerCase();

    return (
        <>

            <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                <Link to={`/pet-listing?category=${categoryFilter}`}>
                    <figure className="relative">
                        <img
                            src={url}
                            alt="card image"
                            className="h-[300px] w-full"
                        />
                        <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 p-6 text-white">
                            <h3 className="text-2xl font-serif font-medium text-center">{category}</h3>
                        </figcaption>
                    </figure>
                </Link >
            </div>


        </>

    );
};

export default CateogyCard;
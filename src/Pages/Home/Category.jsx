import CateogyCard from "../../Components/Cards/CateogyCard";


const Category = () => {
    return (
        <div className="my-12 px-4 lg:px-0">
            <h1 className="text-2xl sm:text-5xl font-bold text-center">Pets Category</h1>
            <p className="text-lg mt-8 sm:w-1/2 mx-auto text-center sm:mb-12">Explore our wide range of pets, from graceful cats and loyal dogs to curious rabbits and tranquil fish. Find your perfect companion today and bring home a new friend to love and cherish!</p>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <CateogyCard url="https://i.ibb.co/ykS6p9w/dog.jpg" category={"Dog"}></CateogyCard>
                <CateogyCard url="https://i.ibb.co/Cs7p4BX/banner-cat.jpg" category={"Cat"}></CateogyCard>
                <CateogyCard url="https://i.ibb.co/TrxRZRS/parrot.jpg" category={"Parrot"}></CateogyCard>
                <CateogyCard url="https://i.ibb.co/d5gP1DZ/petfish.jpg" category={"Fish"}></CateogyCard>
                <CateogyCard url="https://i.ibb.co/zG89Dc2/rabbit.jpg" category={"Rabbit"}></CateogyCard>
                <CateogyCard url="https://i.ibb.co/Ry97YC2/hamster.jpg" category={"Hamster"}></CateogyCard>
            </div>
        </div>
    );
};

export default Category;
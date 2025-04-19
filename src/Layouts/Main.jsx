import { Outlet } from "react-router-dom";
import Footer from "../Components/Shared/Footer";
import Navbar from "../Components/Shared/Navbar";

const Main = () => {
    return (
        <div className="relative ">
            <Navbar />
            <div className=' min-h-[calc(90vh-68px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;
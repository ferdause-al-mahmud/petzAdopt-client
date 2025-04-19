import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <div className="flex flex-col md:flex-row  items-center justify-center md:h-[90vh] p-6">
                <div className="flex items-center justify-center">
                    <img className="w-1/2" src="https://i.postimg.cc/P5YHNPnF/Scarecrow.png" alt="404-Scarecrow" />
                </div>
                <div className="font-mosnstrat text-5xl font-bold space-y-8">
                    <h2 className="">I have bad news for you</h2>
                    <p className="text-2xl">
                        The page you are looking for might be removed or is temporarily
                        unavailable
                    </p>
                    <Link className="btn btn-primary"><button to="/">Back to homepage</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
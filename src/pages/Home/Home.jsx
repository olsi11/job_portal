import React from "react";
import { Link } from "react-router-dom";
import { LuArrowRightFromLine } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";

function Home() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="h-screen">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`absolute top-5 z-[100] text-blue-800 p-2 rounded transition-transform duration-300 cursor-pointer ${
                    isOpen ? "top-19 left-49" : "top-5 left-1"
                }`}
            >
                {isOpen ? <LuArrowRightFromLine className="rotate-180" /> : <RxHamburgerMenu />}
            </button>
            <div
                className={`fixed top-16 left-0 h-full bg-gray-200 shadow-lg transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 w-64 sm:w-48 md:w-64 flex flex-col space-y-4 p-6`}
            >
                <Link
                    to="category/restaurants"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:bg-gray-300 transition-colors duration-300 p-2 rounded"
                >
                    Restaurants
                </Link>
                <Link
                    to="category/It"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:bg-gray-300 transition-colors duration-300 p-2 rounded"
                >
                    IT
                </Link>
                <Link
                    to="category/health"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:bg-gray-300 transition-colors duration-300 p-2 rounded"
                >
                    Health
                </Link>
                <Link
                    to="category/education"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:bg-gray-300 transition-colors duration-300 p-2 rounded"
                >
                    Education
                </Link>
                <Link
                    to="category/entertainment"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:bg-gray-300 transition-colors duration-300 p-2 rounded"
                >
                    Entertainment
                </Link>
                <Link
                    to="category/finance"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:bg-gray-300 transition-colors duration-300 p-2 rounded"
                >
                    Finance
                </Link>
                <Link
                    to="category/transportation"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:bg-gray-300 transition-colors duration-300 p-2 rounded"
                >
                    Transportation
                </Link>
                <Link
                    to="category/real-estate"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:bg-gray-300 transition-colors duration-300 p-2 rounded"
                >
                    Real Estate
                </Link>
                <Link
                    to="category/food"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:bg-gray-300 transition-colors duration-300 p-2"
                >
                    Food
                </Link>
            </div>
            <div
                className={`w-full p-4 transition-transform duration-300 ${
                    isOpen ? "ml-64" : "ml-0"
                }`}
            >
                <h1 className="text-center text-xl md:text-2xl lg:text-3xl">Welcome to the Home Page</h1>
            </div>
        </div>
    );
}

export default Home;
import React from 'react';
import { useLoggedIn } from '../context/LoggedInContext';

interface ProgressBarProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

// Progress bar component to show the current page and navigate to other pages
const ProgressBar: React.FC<ProgressBarProps> = ({ currentPage, setCurrentPage }) => {
    const { emailVal } = useLoggedIn();
    const handleClick = (page: number) => {
        if(emailVal) localStorage.setItem('lastUsedPage_' + emailVal, page.toString());
        setCurrentPage(page);
    };

    return (
        <div className='flex justify-center space-x-8 w-[50%] mx-auto mt-8'>
            <div
                className={`relative w-8 h-8 rounded-full border-2 transition-all ease-in-out duration-300 cursor-pointer
                            ${currentPage === 1 ? "bg-white text-blue-500 border-blue-500"
                                : "bg-gray-300 text-gray-500 border-gray-400"}`}
                onClick={() => handleClick(1)}
            >
                <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
                    {"1"}
                </span>
            </div>

            <div className="h-[2px] mt-4 bg-gray-300 flex-1"></div>

            <div
                className={`relative w-8 h-8 rounded-full border-2 transition-all ease-in-out duration-300 cursor-pointer
                            ${currentPage === 2 ? "bg-white text-blue-500 border-blue-500"
                                : "bg-gray-300 text-gray-500 border-gray-400"}`}
                onClick={() => handleClick(2)}
            >
                <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
                    {"2"}
                </span>
            </div>

            <div className="h-[2px] mt-4 bg-gray-300 flex-1"></div>

            <div
                className={`relative w-8 h-8 rounded-full border-2 transition-all ease-in-out duration-300 cursor-pointer
                            ${currentPage === 3 ? "bg-white text-blue-500 border-blue-500"
                                : "bg-gray-300 text-gray-500 border-gray-400"}`}
                onClick={() => handleClick(3)}
            >
                <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
                    {"3"}
                </span>
            </div>
        </div>
    )
}

export default ProgressBar;

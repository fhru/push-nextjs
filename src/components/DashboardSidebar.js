import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";

const DashboardSidebar = ({ setActiveTab }) => {
    const router = useRouter();
    const [active, setActive] = useState('data');

    const handleTabClick = (tab) => {
        setActive(tab);
        setActiveTab(tab);
    };

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="w-64 shadow-lg h-screen bg-ijo/50">
            <div className="p-4 font-bold text-xl flex items-center text-ijo bg-white">
                <span onClick={handleGoBack} className="cursor-pointer mr-2">
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                </span>
                Dashboard
            </div>
            <ul>
                <li
                    className={`p-4 hover:bg-white/40 cursor-pointer border-b border-white/50 font-semibold transition-all ${active === 'data' ? 'bg-white/50' : ''}`}
                    onClick={() => handleTabClick('data')}
                >
                    Data
                </li>
                <li
                    className={`p-4 hover:bg-white/40 cursor-pointer border-b border-white/50 font-semibold transition-all ${active === 'user' ? 'bg-white/50' : ''}`}
                    onClick={() => handleTabClick('user')}
                >
                    User
                </li>
            </ul>
        </div>
    );
};

export default DashboardSidebar;

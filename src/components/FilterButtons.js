import React, { useState } from 'react';
import { faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterButtons = ({ handleCategoryFilter, handleRatingFilter, resetFilter }) => {
    const [activeButton, setActiveButton] = useState(null);

    const handleCategoryClick = (category) => {
        handleCategoryFilter(category);
        setActiveButton(category);
    };

    const handleRatingClick = (rating) => {
        handleRatingFilter(rating);
        setActiveButton(`rating-${rating}`);
    };

    const handleResetClick = () => {
        resetFilter();
        setActiveButton(null);
    };

    return (
        <div className="flex justify-center items-center gap-2 p-3 mt-3">
            <button
                onClick={() => handleCategoryClick('Makanan')}
                className={`hover:bg-black/5 text-sm flex justify-center items-center border-2 border-black/20 px-4 py-2 rounded-full text-black/50 transition-all ${activeButton === 'Makanan' ? 'bg-ijo/10' : ''}`}
            >
                Makanan
            </button>
            <button
                onClick={() => handleCategoryClick('Minuman')}
                className={`hover:bg-black/5 text-sm flex justify-center items-center border-2 border-black/20 px-4 py-2 rounded-full text-black/50 transition-all ${activeButton === 'Minuman' ? 'bg-ijo/10' : ''}`}
            >
                Minuman
            </button>
            <button
                onClick={() => handleCategoryClick('Dessert')}
                className={`hover:bg-black/5 text-sm flex justify-center items-center border-2 border-black/20 px-4 py-2 rounded-full text-black/50 transition-all ${activeButton === 'Dessert' ? 'bg-ijo/10' : ''}`}
            >
                Dessert
            </button>
            <button
                onClick={() => handleRatingClick(4)}
                className={`hover:bg-black/5 text-sm flex justify-center items-center border-2 border-black/20 px-4 py-2 rounded-full text-black/50 transition-all ${activeButton === 'rating-4' ? 'bg-ijo/10' : ''}`}
            >
                Rating 4+
            </button>
            <button
                onClick={handleResetClick}
                className={`hover:bg-black/5 text-sm flex justify-center items-center text-black/50 transition-all ${activeButton ? '' : 'pointer-events-none'}`}
                disabled={!activeButton}
            >
                <FontAwesomeIcon icon={faFilterCircleXmark} className="mr-1" /> Reset Filters
            </button>
        </div>
    );
};

export default FilterButtons;

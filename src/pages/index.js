import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Contents from '@/components/Contents';
import Hero from '@/components/Hero';
import FilterButtons from '@/components/FilterButtons';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState({ category: '', rating: 0 });

    useEffect(() => {
        fetch("https://enjoyed-totally-gorilla.ngrok-free.app/items", {
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        })
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const handleCategoryFilter = (category) => {
        setFilter({ ...filter, category });
    };

    const handleRatingFilter = (rating) => {
        setFilter({ ...filter, rating });
    };

    const resetFilter = () => {
        setFilter({ category: '', rating: 0 });
    };

    return (
        <div>
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Hero />
            <FilterButtons
                handleCategoryFilter={handleCategoryFilter}
                handleRatingFilter={handleRatingFilter}
                resetFilter={resetFilter}
            />
            <Contents searchTerm={searchTerm} items={items} filter={filter} />
        </div>
    );
};

export default Home;

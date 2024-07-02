import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import Badge from './Badge';

const Contents = ({ searchTerm, items, filter }) => {
    const [hoveredItem, setHoveredItem] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true); // Added state isLoading

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />);
        }

        if (halfStar) {
            stars.push(<FontAwesomeIcon key={fullStars} icon={faStarHalf} className="text-yellow-500" />);
        }

        return stars;
    };

    const filteredItems = items.filter(item => {
        const matchesSearchTerm = item.nama.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filter.category ? item.category.includes(filter.category) : true;
        const matchesRating = filter.rating ? item.rating >= filter.rating : true;
        return matchesSearchTerm && matchesCategory && matchesRating;
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-36">
                <div className="relative inline-flex">
                    <div className="w-8 h-8 bg-ijo rounded-full"></div>
                    <div className="w-8 h-8 bg-ijo rounded-full absolute top-0 left-0 animate-ping"></div>
                    <div className="w-8 h-8 bg-ijo rounded-full absolute top-0 left-0 animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (filteredItems.length === 0) {
        return <p className="text-center mt-4">Item Not Found</p>; // Display "Item Not Found" if no items match the filter
    }

    return (
        <div className="flex justify-center items-center flex-wrap gap-4 p-4">
            {filteredItems.map(item => (
                <Link key={item.id} href={`/Toko/${item.id}`} passHref>
                    <div className="group flex flex-col justify-center items-center bg-white hover:bg-gray-200 transition-all rounded-lg shadow-lg w-full max-w-xs overflow-hidden hover:cursor-pointer"
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <div
                            className="w-full relative group-hover:brightness-75 transition-all">
                            <Image
                                src={item.gambar}
                                width={500}
                                height={500}
                                alt="Product"
                                className="h-40 object-cover object-center"
                                priority={true}
                            />
                        </div>
                        <div className="p-4 w-full h-full">
                            <p className="text-lg font-bold line-clamp-2">{item.nama}</p>
                            <p className="text-sm text-black/50 my-2">
                                {hoveredItem === item.id ? `Rating ${item.rating}` : renderStars(item.rating)}
                            </p>
                            <p className="item-address line-clamp-2">{item.alamat}</p>
                            <div className="flex mt-6 gap-1.5">
                                {item.category.map((cat, index) => (
                                    <span key={index}>
                                        <Badge name={cat} />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Contents;

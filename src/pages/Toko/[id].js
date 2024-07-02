import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faLocationDot, faStar, faStarHalf, faShoppingCart, faCartPlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Badge from '@/components/Badge';
import Notification from '@/components/Notification';

const Toko = () => {
    const router = useRouter();
    const { id } = router.query;

    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        const fetchItem = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://enjoyed-totally-gorilla.ngrok-free.app/items/${id}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch item');
                }
                const data = await response.json();
                setItem(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching item:', error);
                setError('Item Not Found');
                setItem(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchItem();
        }
    }, [id]);

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

    const addToCart = (menuItem) => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = [...storedCart, menuItem];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setNotifications(prevNotifications => [
            ...prevNotifications,
            { message: `${menuItem.nama} Berhasil Ditambahkan ke Keranjang`, type: 'success' }
        ]);
    };


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="relative inline-flex">
                    <div className="w-8 h-8 bg-ijo rounded-full"></div>
                    <div className="w-8 h-8 bg-ijo rounded-full absolute top-0 left-0 animate-ping"></div>
                    <div className="w-8 h-8 bg-ijo rounded-full absolute top-0 left-0 animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return <p className="text-center mt-4 flex h-screen justify-center items-center">{error}</p>;
    }

    return (
        <div>
            {notifications.map((notification, index) => (
                <Notification
                    key={index}
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotifications(prevNotifications => prevNotifications.filter((_, i) => i !== index))}
                />
            ))}

            <div className="bg-gradient-to-t from-white/75 to-ijo p-4 relative h-64">
                <FontAwesomeIcon
                    icon={faArrowLeftLong}
                    className="text-3xl p-2 text-white cursor-pointer hover:text-white/50 transition-all"
                    onClick={() => router.back()}
                />
                <Link href={"/Cart"}>
                    <FontAwesomeIcon icon={faShoppingCart} className="text-3xl p-2 text-white absolute top-4 right-4 hover:text-white/50 transition-all" />
                </Link>
            </div>

            <div className="py-4 px-10 lg:px-20 relative bottom-28 flex flex-col items-center lg:items-start cursor-default">
                <div className="mb-2">
                    <Image src={item.gambar} alt="Profile" width={500} height={500} className="w-32 h-32 object-cover rounded-2xl shadow-lg ring-2 ring-ijo/20 object-center" />
                </div>
                <div className="flex justify-start items-center flex-wrap lg:flex-nowrap py-3 w-full">
                    <div className="basis-auto w-full flex items-center justify-start h-full flex-col lg:flex-row">
                        <div className="basis-auto text-3xl font-bold">
                            {item.nama}{" "}
                        </div>
                        <div className="basis-auto ml-2 py-2"
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            {hoveredItem === item.id ? `Rating ${item.rating}` : renderStars(item.rating)}
                        </div>
                    </div>
                    <div className="basis-auto w-full flex justify-center my-4 lg:my-0 lg:justify-end gap-3">
                        {item.category.map((cat, index) => (
                            <span key={index}>
                                <Badge name={cat} outline={"true"} />
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex gap-2 justify-center items-center text-black/50">
                    <FontAwesomeIcon icon={faLocationDot} /> {item.alamat}
                </div>
            </div>

            <div className="py-4 px-10 lg:px-20 flex flex-col w-full h-full relative bottom-20">
                <div className="text-2xl font-bold mb-4">
                    Menu
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {item.menu.map((menuItem) => (
                        <div key={menuItem.id} className="bg-white rounded-lg shadow-lg flex flex-col items-center">
                            <Image src={menuItem.gambar} alt={menuItem.nama} width={200} height={200} className="w-full h-48 object-cover object-center rounded-t-lg aspect-square" />
                            <div className="flex w-full h-full py-4 px-4">
                                <div className="flex-1 ">
                                    <div className="text-xl font-semibold">{menuItem.nama}</div>
                                    <div className="text-lg text-gray-700">Rp {parseInt(menuItem.harga).toLocaleString()}</div>
                                </div>
                                <div className="flex flex-1 items-center justify-end ">
                                    <button
                                        onClick={() => addToCart(menuItem)}
                                        className="bg-ijo text-white w-12 h-12 rounded hover:bg-ijo/50 transition-all text-center"
                                    >
                                        <FontAwesomeIcon icon={faCartPlus} size="lg" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Toko;

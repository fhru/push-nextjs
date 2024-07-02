import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faTimes, faTrash, faPlus, faMinus, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Notification from '@/components/Notification';

const Cart = () => {
    const router = useRouter();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const groupedCart = storedCart.reduce((acc, item) => {
            const existingItem = acc.find(cartItem => cartItem.nama === item.nama);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                acc.push({ ...item, quantity: 1 });
            }
            return acc;
        }, []);
        setCart(groupedCart);
    }, []);

    const updateCartInLocalStorage = (updatedCart) => {
        const flatCart = updatedCart.flatMap(item => Array(item.quantity).fill(item));
        localStorage.setItem('cart', JSON.stringify(flatCart));
    };

    const increaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        setCart(updatedCart);
        updateCartInLocalStorage(updatedCart);
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        } else {
            updatedCart.splice(index, 1);
        }
        setCart(updatedCart);
        updateCartInLocalStorage(updatedCart);
    };

    const removeFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        updateCartInLocalStorage(updatedCart);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.harga * item.quantity), 0);
    };

    const handleCheckout = () => {
        alert('Pesanan kamu sedang di proses. Harap tunggu.');
    };

    return (
        <div>
            <div className="bg-gradient-to-t from-white/75 to-ijo p-4 relative h-64">
                <FontAwesomeIcon
                    icon={faArrowLeftLong}
                    className="text-3xl p-2 text-white hover:text-white/50 transition-all cursor-pointer"
                    onClick={() => router.back()}
                />
            </div>

            <div className="py-4 px-3 lg:px-20 relative bottom-28">
                <div className="text-5xl lg:text-6xl text-white font-bold relative bottom-16 text-center lg:text-left">
                    Food Cart
                </div>
                <div className="grid grid-cols-1 gap-2 lg:gap-4">
                    {cart.length > 0 ? cart.map((menuItem, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg flex items-center p-2 h-20 lg:h-28">
                            <Image
                                src={menuItem.gambar}
                                alt={menuItem.nama}
                                width={500}
                                height={500}
                                className="object-cover rounded-md h-16 lg:w-24 w-16 lg:h-24 aspect-square"
                            />
                            <div className="basis-auto w-full h-full flex flex-col justify-center pl-4">
                                <div className="text-sm lg:text-lg font-semibold">{menuItem.nama}</div>
                                <div className="text-sm lg:text-lg text-gray-700">
                                    Rp {parseInt(menuItem.harga).toLocaleString()}
                                </div>
                            </div>
                            <div className="basis-auto flex justify-center items-center gap-0 lg:gap-2 w-full">
                                <button
                                    onClick={() => decreaseQuantity(index)}
                                    className="p-2 text-xl text-red-500/50 hover:text-red-500 transition-all"
                                >
                                    <FontAwesomeIcon icon={faMinusCircle} />
                                </button>
                                <div className="text-xl">
                                    x{menuItem.quantity}
                                </div>
                                <button
                                    onClick={() => increaseQuantity(index)}
                                    className="p-2 text-xl text-ijo/50 hover:text-ijo transition-all"
                                >
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </button>
                            </div>
                            <div className="basis-auto w-full h-full flex items-center justify-end pr-2 lg:pr-4">
                                <button
                                    onClick={() => removeFromCart(index)}
                                    className="p-2 hover:text-red-500 transition-all"
                                >
                                    <FontAwesomeIcon icon={faTimes} className="text-xl" />
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="text-2xl flex w-full justify-center pt-20">
                            Your Cart is Empty
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <>
                        <div className="text-sm lg:text-xl font-semibold mt-8 text-left lg:text-right">
                            Total: Rp {getTotalPrice().toLocaleString()}
                        </div>
                        <div className="flex justify-center items-center w-full">
                            <button
                                onClick={handleCheckout}
                                className="bg-ijo w-full text-lg font-bold text-white py-3 px-4 rounded-full mt-4 hover:bg-ijo/50 transition-all"
                            >
                                Pesan Sekarang
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

};

export default Cart;

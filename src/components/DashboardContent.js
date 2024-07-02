import { useState, useEffect } from 'react';

const DashboardContent = ({ activeTab }) => {
    const [formData, setFormData] = useState({
        id: 0,
        nama: '',
        gambar: '',
        rating: '',
        alamat: '',
        category: [],
        menu: []
    });

    const [userFormData, setUserFormData] = useState({
        id: 0,
        username: '',
        email: '',
        name: '',
        role: '',
        password: ''
    });

    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');
    const [menuId, setMenuId] = useState(1);

    useEffect(() => {
        const fetchLastId = async () => {
            try {
                const response = await fetch('https://enjoyed-totally-gorilla.ngrok-free.app/items', {
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                    }
                });
                const items = await response.json();
                const lastId = items.length > 0 ? Math.max(...items.map(item => item.id)) : 0;
                setFormData(prevFormData => ({ ...prevFormData, id: lastId + 1 }));
            } catch (error) {
                console.error('Failed to fetch last ID', error);
            }
        };

        fetchLastId();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        const categories = value.split(',').map((cat) => cat.trim());
        setFormData({ ...formData, category: categories });
    };

    const handleMenuChange = (index, e) => {
        const { name, value } = e.target;
        const newMenu = formData.menu.map((menuItem, i) => {
            if (i === index) {
                return { ...menuItem, [name]: value };
            }
            return menuItem;
        });
        setFormData({ ...formData, menu: newMenu });
    };

    const addMenuItem = () => {
        const parsePriceToInt = (price) => {
            const parsedPrice = parseInt(price, 10);
            return isNaN(parsedPrice) ? 0 : parsedPrice;
        };

        setFormData({
            ...formData,
            menu: [
                ...formData.menu,
                { id: menuId, nama: '', harga: parsePriceToInt(''), gambar: '' }
            ]
        });
        setMenuId(menuId + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://enjoyed-totally-gorilla.ngrok-free.app/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setSubmitSuccess('Item created successfully');
                setSubmitError('');
                // Reset form after successful submission
                const newId = formData.id + 1;
                setFormData({
                    id: newId,
                    nama: '',
                    gambar: '',
                    rating: '',
                    alamat: '',
                    category: [],
                    menu: []
                });
                setMenuId(1);
            } else {
                const errorData = await response.json();
                setSubmitError(errorData.message || 'Failed to create item');
                setSubmitSuccess('');
            }
        } catch (error) {
            setSubmitError('Failed to create item');
            setSubmitSuccess('');
        }
    };

    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://enjoyed-totally-gorilla.ngrok-free.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userFormData),
            });

            if (response.ok) {
                const data = await response.json();
                setSubmitSuccess('User registered successfully');
                setSubmitError('');
                // Reset form after successful submission
                setUserFormData({
                    id: 0,
                    username: '',
                    email: '',
                    name: '',
                    role: '',
                    password: ''
                });
            } else {
                const errorData = await response.json();
                setSubmitError(errorData.message || 'Failed to register user');
                setSubmitSuccess('');
            }
        } catch (error) {
            setSubmitError('Failed to register user');
            setSubmitSuccess('');
        }
    };

    const renderForm = () => (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700">ID</label>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    disabled
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Gambar</label>
                <input
                    type="text"
                    name="gambar"
                    value={formData.gambar}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Alamat</label>
                <input
                    type="text"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Category (comma separated)</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category.join(', ')}
                    onChange={handleCategoryChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Menu</label>
                {formData.menu.map((menuItem, index) => (
                    <div key={index} className="space-y-2">
                        <input
                            type="text"
                            name="nama"
                            placeholder="Nama Menu"
                            value={menuItem.nama}
                            onChange={(e) => handleMenuChange(index, e)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                        <input
                            type="number"
                            name="harga"
                            placeholder="Harga"
                            value={menuItem.harga}
                            onChange={(e) => handleMenuChange(index, e)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                        <input
                            type="text"
                            name="gambar"
                            placeholder="Gambar Menu"
                            value={menuItem.gambar}
                            onChange={(e) => handleMenuChange(index, e)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addMenuItem}
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md font-semibold"
                >
                    Add Menu Item
                </button>
            </div>
            {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{submitError}</span>
                </div>
            )}
            {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{submitSuccess}</span>
                </div>
            )}
            <button
                type="submit"
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md font-semibold"
            >
                Submit
            </button>
        </form>
    );

    const renderUserForm = () => (
        <form className="space-y-4" onSubmit={handleUserSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    type="text"
                    name="username"
                    value={userFormData.username}
                    onChange={handleUserInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={userFormData.email}
                    onChange={handleUserInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={userFormData.name}
                    onChange={handleUserInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                    type="text"
                    name="role"
                    value={userFormData.role}
                    onChange={handleUserInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    name="password"
                    value={userFormData.password}
                    onChange={handleUserInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{submitError}</span>
                </div>
            )}
            {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{submitSuccess}</span>
                </div>
            )}
            <button
                type="submit"
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md font-semibold"
            >
                Submit
            </button>
        </form>
    );

    return (
        <div className="p-4">
            {activeTab === 'data' ? renderForm() : renderUserForm()}
        </div>
    );
};

export default DashboardContent;

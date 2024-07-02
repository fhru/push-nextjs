import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    let bgColor, icon;
    switch (type) {
        case 'success':
            bgColor = 'bg-green-500';
            icon = faCheckCircle;
            break;
        case 'error':
            bgColor = 'bg-red-500';
            icon = faExclamationCircle;
            break;
        default:
            bgColor = 'bg-blue-500';
            icon = faInfoCircle;
            break;
    }

    return (
        <div className={`fixed top-16 right-5 z-50 p-4 rounded-md shadow-lg flex items-center text-white ${bgColor} slideIn`}>
            <FontAwesomeIcon icon={icon} className="mr-3" />
            <div className="flex-1">{message}</div>
            <button onClick={onClose} className="ml-3">
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
    );
};

export default Notification;

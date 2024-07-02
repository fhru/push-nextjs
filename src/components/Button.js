import React from "react";

const Button = ({ name, outline, full }) => {
    return (
        <div className={`cursor-pointer flex justify-center items-center min-w-32 w-full h-full px-4 py-2 rounded-md font-semibold transition-all ${full ? 'w-full' : ''}  ${outline ? 'border-2 border-ijo text-ijo bg-transparent hover:bg-ijo/10' : 'bg-ijo text-white hover:bg-ijo/50'} `}>
            {name}
        </div>
    )
}

export default Button

import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Badge = ({ name, outline }) => {
    return (
        <div className={`flex justify-center items-center py-1 px-1.5 text-xs rounded-md ${outline ? 'text-black border border-ijo' : 'text-black/50 bg-black/5'}`}>
            <FontAwesomeIcon icon={faCircle} style={{ color: "#00aa5b" }} className="mr-1" /> {name}
        </div>
    )
}

export default Badge;

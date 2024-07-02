import React from "react";

const Hero = () => {
    return (
        <div className="relative text-white text-center h-full py-16 lg:py-36 overflow-hidden">
            <div className="absolute inset-0 bg-hero-image filter brightness-75 z-0"></div>
            <div className="relative z-10 px-10 lg:px-0">
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-normal lg:leading-none">
                    Selamat Datang di <span className="bg-ijo px-2">PUSH!</span>
                </h1>
                <p className="text-sm lg:text-2xl">
                    We are glad to have you here. Explore and enjoy our Resto!
                </p>
            </div>
        </div>
    )
}

export default Hero;

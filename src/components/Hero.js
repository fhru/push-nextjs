import React from "react";

const Hero = () => {
    return (
        <div className="relative text-white text-center h-full py-36 overflow-hidden">
            <div className="absolute inset-0 bg-hero-image filter brightness-100 z-0"></div>
            <div className="relative z-10">
                <h1 className="text-6xl font-bold mb-4">
                    Selamat Datang di <span className="bg-ijo px-2">PUSH!</span>
                </h1>
                <p className="text-2xl mb-8">
                    We are glad to have you here. Explore and enjoy our Resto!
                </p>
            </div>
        </div>
    )
}

export default Hero;

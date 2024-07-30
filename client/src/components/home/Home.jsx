import React, { useEffect, useState } from "react";

// Forward arrow SVG
const ForwardArrowSVG = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48px"
        viewBox="0 -960 960 960"
        width="48px"
        fill="#FFFFFF"
        className="bg-dark-navy rounded-full border-white border-2 scale-105"
      >
        <path d="M686-450H160v-60h526L438-758l42-42 320 320-320 320-42-42 248-248Z" />
      </svg>
    </>
  );
};

// SVG for the back arrow
const BackArrowSVG = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48px"
        viewBox="0 -960 960 960"
        width="48px"
        fill="#FFFFFF"
        className="bg-dark-navy rounded-full border-white border-2 scale-105"
      >
        <path d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z" />
      </svg>
    </>
  );
};

// Slide information
const slideInfo = [
  {
    src: "/images/products/Cpu/AMD Ryzen 7 7800X3D.png",
    alt: "Ryzen 7 7800X3D",
    header: "Unleash the Beast: AMD Ryzen 7 7800X3D",
    text: "Dominate your gaming experience with the AMD Ryzen 7 7800X3D. Boasting 8 cores and 16 threads, this powerhouse CPU delivers unmatched performance for even the most demanding games. Elevate your gameplay and streaming with lightning-fast speeds and seamless multitasking. Ready to take your gaming to the next level?",
  },
  {
    src: "/images/products/Gpu/MSI EXPERT GeForce RTX 4080 SUPER 16GB.png",
    alt: "RTX 4080 SUPER",
    header: "Ultimate Power: MSI EXPERT GeForce RTX 4080 SUPER 16GB",
    text: "Experience breathtaking graphics and unparalleled power with the MSI EXPERT GeForce RTX 4080 SUPER 16GB. This high-performance GPU guarantees smooth gameplay and stunning visuals. Whether you're conquering the latest AAA titles or pushing the limits in professional settings, the RTX 4080 SUPER is your ultimate gaming companion. Are you ready to power up?",
  },
  {
    src: "/images/products/Powersupply/EVGA SuperNOVA 1200 P2 1200W 80+ Platinum Fully Modular Power Supply.png",
    alt: "EVGA SuperNOVA 1200 P2",
    header: "Endless Power: EVGA SuperNOVA 1200 P2",
    text: "Never compromise on power with the EVGA SuperNOVA 1200 P2. Featuring a massive 1200W capacity and 80+ Platinum efficiency, this fully modular power supply ensures your gaming rig receives reliable and efficient power. Say goodbye to interruptions and hello to uninterrupted gaming bliss. Ready to power your passion?",
  },
];

// Component for the Hero section
function Hero() {
  return (
    <div className="bg-hero bg-center bg-cover bg-no-repeat text-white py-40 bg-black bg-opacity-90">
      <h1 className="text-5xl md:text-8xl text-center bg-black bg-opacity-50 py-2">
        Empowering Gamers
      </h1>
    </div>
  );
}

// Component for the Carousal
function Carousal({ autoSlide = false, autoSlideTime = 3000 }) {
  const [index, setIndex] = React.useState(0);

  console.log(index);
  const prev = () => {
    setIndex(index === 0 ? slideInfo.length - 1 : index - 1);
  };
  const next = () => {
    setIndex(index === slideInfo.length - 1 ? 0 : index + 1);
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideTime);
    return () => clearInterval(slideInterval);
  });

  return (
    <>
      <div className="overflow-hidden relative m-2 md:m-12">
        <div
          className="grid grid-cols-3-full justify-between transition-transform ease-out duration-500 translate-x-[1px]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slideInfo.map((slide, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 p-6`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="max-w-full max-h-[500px] aspect-square object-contain"
              />
              <div className="max-w-full max-h-[500px] overflow-auto aspect-square text-xl border-4 border-black rounded-md p-6 flex flex-col justify-between bg-light-grayish-blue text-black">
                <p>{slide.header}</p>
                <p>{slide.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          id="slideArrowButtonHolder"
          className="absolute inset-x-0 inset-y-full top-1/2"
        >
          <button
            onClick={prev}
            aria-label="previous slide"
            className="absolute top-1/2 left-4 bg-dark-navy z-10 p-1 rounded-full opacity-80 hover:opacity-100"
          >
            <BackArrowSVG />
          </button>
          <button
            onClick={next}
            aria-label="next slide"
            className="absolute top-1/2 right-4 bg-dark-navy text z-10 p-1 rounded-full opacity-80 hover:opacity-100"
          >
            <ForwardArrowSVG />
          </button>
        </div>
        <div
          id="slideNavButtonHolder"
          className="absolute bottom-4 left-0 right-0"
        >
          <div className="flex items-center justify-center gap-2">
            {slideInfo.map((_, i) => (
              <button
                key={i}
                aria-label="slide navigation"
                onClick={() => setIndex(i)}
                className={`w-4 h-4 rounded-full bg-black hover:bg-gray-500 transition-colors duration-300
              ${index === i ? "p-4" : "bg-opacity-50"}
              `}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Component for the Home page
export default function Home() {
  return (
    <>
      <Hero />
      {/* <Slider /> */}
      {/* <SliderV2 slides={slides} /> */}
      <div className="bg-mid-grayish-blue flex justify-center p-1 md:p-6">
        <div className="max-w-7xl">
          <Carousal autoSlide={false} autoSlideTime={4000} />
        </div>
      </div>
      {/* <GenerateBuild /> */}
    </>
  );
}

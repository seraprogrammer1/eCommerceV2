import React, { useEffect, useState } from "react";

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

function Hero() {
  return (
    <div className="bg-light-grayish-blue text-dark-navy py-40">
      <h1 className="text-5xl md:text-8xl text-center">Empowering Gamers</h1>
    </div>
  );
}

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
      <div className="overflow-hidden relative m-12">
        <div
          className="grid grid-cols-3-full justify-between transition-transform ease-out duration-500 translate-x-[1px]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slideInfo.map((slide, i) => (
            <div key={i} className={`grid grid-cols-2`}>
              <img
                src={slide.src}
                alt={slide.alt}
                className="max-w-[500px] max-h-[500px] aspect-square object-contain"
              />
              <div className="max-w-[500px] max-h-[500px] aspect-square text-xl border-4 border-black rounded-md p-6 flex flex-col justify-between bg-light-grayish-blue text-black">
                <h3>{slide.header}</h3>
                <p>{slide.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0">
          <button
            onClick={prev}
            className="absolute top-1/2 left-4 bg-dark-navy z-10 p-1 rounded-full opacity-80 hover:opacity-100"
          >
            <BackArrowSVG />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-4 bg-dark-navy text z-10 p-1 rounded-full opacity-80 hover:opacity-100"
          >
            <ForwardArrowSVG />
          </button>
        </div>
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex items-center justify-center gap-2">
            {slideInfo.map((_, i) => (
              <button
                key={i}
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

function GenerateBuild() {
  const [price, setPrice] = React.useState(750);

  const handleInput = (e) => {
    setPrice(parseInt(e.target.value));
  };

  return (
    <span className="grid grid-cols-1 gap-10 sm:gap-20 justify-items-center sm:grid-cols-2 py-40 px-6">
      <form className="border-4 w-full h-full max-h-500px max-w-500px rounded-md p-6">
        <h2>Generate your build</h2>
        <fieldset className="flex">
          <label htmlFor="price">Price: </label>
          <input
            id="price"
            type="range"
            min="750"
            max="3000"
            step="150"
            value={price}
            onInput={handleInput}
          />
          <output name="total" htmlFor="price">
            {price}
          </output>
        </fieldset>
        <fieldset className="flex">
          <p>Resolution:</p>
          <label htmlFor="1080p">1080</label>
          <input id="1080p" type="radio" value="1080p" name="Resolution" />
          <label htmlFor="1440p">1440</label>
          <input id="1440p" type="radio" value="1440p" name="Resolution" />
          <label htmlFor="4k">4k</label>
          <input id="4k" type="radio" value="4k" name="Resolution" />
        </fieldset>
      </form>
      <img src="https://via.placeholder.com/500" alt="placeholder" />
    </span>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      {/* <Slider /> */}
      {/* <SliderV2 slides={slides} /> */}
      <div className="bg-mid-grayish-blue p-6">
        <div className="max-w-7xl">
          <Carousal autoSlide={false} autoSlideTime={4000} />
        </div>
      </div>
      {/* <GenerateBuild /> */}
    </>
  );
}

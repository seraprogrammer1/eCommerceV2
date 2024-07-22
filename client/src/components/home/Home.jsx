import React, { useEffect } from "react";

function Hero() {
  return (
    <div className="bg-light-grayish-blue text-dark-navy py-40">
      <h1 className="text-5xl md:text-8xl text-center">Empowering Gamers</h1>
    </div>
  );
}
function Slider() {
  const [index, setIndex] = React.useState(0);
  let maxIndex = 0;

  function UpdateSilder(newIndex) {
    const slides = document.querySelectorAll(".slide");
    slides[newIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  const handleNext = () => {
    console.log("next");
    const newIndex = index === maxIndex - 1 ? 0 : index + 1;
    setIndex(newIndex);
    UpdateSilder(newIndex);
  };

  const handlePrev = () => {
    console.log("prev");
    const newIndex = index === 0 ? maxIndex - 1 : index - 1;
    setIndex(newIndex);
    UpdateSilder(newIndex);
  };

  useEffect(() => {
    maxIndex = document.querySelectorAll(".slide").length;
  });

  function Slide({ src, alt, text, text2, classes }) {
    return (
      <div className="p-6">
        <span
          className={`slide py-40 grid grid-cols-1 gap-10 sm:gap-20 sm:grid-cols-2 justify-items-center ${classes}`}
        >
          <img
            className="rounded-md object-contain w-[500px] h-[500px]"
            src={src}
            alt={alt}
          />
          <div className="aspect-square w-full h-full text-xl border-4 max-h-[500px] max-w-[500px] rounded-md p-6">
            <p>{text}</p>
            <p>{text2}</p>
          </div>
        </span>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-white border-[4px] p-[4px] border-black">
      <div className="relative ">
        <div className="relative holder h-full z-10 grid grid-cols-3-full w-full overflow-hidden">
          <Slide
            src="/images/products/Cpu/AMD Ryzen 7 7800X3D.png"
            text="Experience unparalleled performance with the AMD Ryzen 7 7800X3D"
            text2="With 8 cores and 16 threads, this CPU is capable of handling even the most demanding games with ease. Whether you're playing the latest AAA titles or streaming your favorite games, the AMD Ryzen 7 7800X3D has you covered."
            classes={"bg-dark-navy text-light-grayish-blue"}
          />
          <Slide
            src="https://via.placeholder.com/500"
            text="2 mock text mock text mock text mock text mock text mock text mock
            text"
          />
          <Slide
            src="https://via.placeholder.com/500"
            text="3 mock text mock text mock text mock text mock text mock text mock
            text"
          />
        </div>
        <div className="absolute w-full -inset-0">
          <button
            onClick={handlePrev}
            className="absolute z-20 translate-y-1/2 bottom-1/2 left-6 bg-dark-navy rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48px"
              viewBox="0 -960 960 960"
              width="48px"
              fill="#FFFFFF"
            >
              <path d="m480-334 42-42-74-74h182v-60H448l74-74-42-42-146 146 146 146Zm0 254q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute z-20 translate-y-1/2 bottom-1/2 right-6 bg-dark-navy rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48px"
              viewBox="0 -960 960 960"
              width="48px"
              fill="#FFFFFF"
            >
              <path d="m480-334 146-146-146-146-42 42 74 74H330v60h182l-74 74 42 42Zm0 254q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
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
      <Slider />
      <GenerateBuild />
    </>
  );
}

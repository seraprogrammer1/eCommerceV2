import React from "react";
import icon from "../../assets/images/nav/icon.png";
import facebook from "../../assets/images/socialIcons/facebook.png";
import instagram from "../../assets/images/socialIcons/instagram.png";
import twitter from "../../assets/images/socialIcons/twitter.png";
import { Link } from "react-router-dom";

function Links({ to, text }) {
  return (
    <span className="mx-2 my-0.5 flex flex-col">
      <Link className="text-sl sm:text-xl text-white" to={to}>
        {text}
      </Link>
    </span>
  );
}

function PageLinks() {
  return (
    <div className="flex py-1 justify-center">
      <nav className="flex mx-6">
        <img
          src={icon}
          alt="Galaxy_Builds_Icon"
          className="w-8 h-8"
          onClick={() => {
            navigate("/home");
          }}
        />
        <Links to="/home" text="Home" />
        <Links to="/store" text="Store" />
        <Links to="/orders" text="Orders" />
        <Links to="/contact" text="Contact" />
      </nav>
    </div>
  );
}

function NewsLetter() {
  return (
    <form
      id="newsLetter"
      className="row-span-2 max-h-150px max-w-170px flex flex-col justify-evenly rounded-lg px-2 text-black bg-light-grayish-blue *:my-2 "
    >
      <h3 className="text-center text-2xl">News Letter</h3>
      <input
        className="border-2 border-dark-navy px-1 rounded-md bg-gray-50 focus:outline-none"
        type="email"
        placeholder="Email"
      />
      <button
        className="mx-auto border-2 border-dark-navy bg-vibrant-sky-blue px-1 py-0.5 rounded-md hover:bg-white hover:text-black"
        type="submit"
      >
        Subscribe
      </button>
    </form>
  );
}

function SocialIcons({ src, alt, href }) {
  return (
    <a
      href={href}
      target="_blank"
      className="bg-white w-10 h-10 flex flex-col justify-center items-center rounded-full mx-1"
    >
      <img src={src} alt={alt} className="w-6 h-6"></img>
    </a>
  );
}

function FooterIcons() {
  return (
    <span className="flex">
      <SocialIcons
        src={facebook}
        alt="facebook"
        href="https://www.facebook.com"
      />
      <SocialIcons
        src={instagram}
        alt="instagram"
        href="https://www.instagram.com"
      />
      <SocialIcons src={twitter} alt="twitter" href="https://www.twitter.com" />
    </span>
  );
}

export default function Footer() {
  return (
    <div id="Footer" className="w-full py-6 bg-dark-navy">
      <PageLinks />
      <div className="flex flex-col *:my-4 items-center justify-items-center max-w-max mx-auto">
        <FooterIcons />
        {/* <NewsLetter /> */}
        <p className="text-white text-center">&copy; All Rights Reserved</p>
      </div>
    </div>
  );
}

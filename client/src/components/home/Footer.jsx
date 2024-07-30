import React from "react";
import icon from "../../assets/images/nav/icon.png";
import facebook from "../../assets/images/socialIcons/facebook.png";
import instagram from "../../assets/images/socialIcons/instagram.png";
import twitter from "../../assets/images/socialIcons/twitter.png";
import { Link, useNavigate } from "react-router-dom";

// Component for the links
function Links({ to, text }) {
  return (
    <span className="mx-2 my-0.5 flex flex-col">
      <Link className="text-sl sm:text-xl text-white" to={to}>
        {text}
      </Link>
    </span>
  );
}

// Component for the page links
function PageLinks() {
  const navigate = useNavigate();
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

// Component for the social media icons
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

// Component for holding the social media icons
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

// Component for the Footer
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

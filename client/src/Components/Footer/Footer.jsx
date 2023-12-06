import React from "react";
import "./Footer.css";
import image from "../../assets/LOGOo.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
const Footer = () => {
  return (
    <div>
      <div>
        <svg
          className="wavesfooter"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallaxfooter">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(89, 5, 5,0.7)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(89, 5, 5,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(89, 5, 5,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#590404" />
          </g>
        </svg>
      </div>
      <footer className="footer-distributed">
        <div className="footer-left">
          <img src={image} alt="" />
          <p className="footer-links">
            <a href="#" className="link-1">
              Home
            </a>

            <a href="#">Blog</a>

            <a href="#">Pricing</a>

            <a href="#">About</a>

            <a href="#">Faq</a>

            <a href="#">Contact</a>
          </p>

          <p className="footer-company-name">Arkx © 2023</p>
        </div>

        <div className="footer-center">
          <div>
            <LocationOnIcon className="footer-icon" />
            <p>
              <span>Boulevard Ghandi, Rond Point Oulmes</span> Casablanca 20026
            </p>
          </div>

          <div>
            <CallIcon className="footer-icon" />
            <p>+212.06.21.30.51.51</p>
          </div>

          <div>
            <EmailIcon className="footer-icon" />
            <p>
              <a href="mailto:support@company.com">oldygoldyhouse@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company</span>
            At OldyGoldyHouse, we don't just run a business; we curate an
            experience, celebrating timeless elegance and the allure of vintage.
          </p>

          <div className="footer-icons">
            <FacebookIcon
              className="soial-icons"
              style={{ fontSize: "40px" }}
            />
            <TwitterIcon className="soial-icons" style={{ fontSize: "40px" }} />
            <InstagramIcon
              className="soial-icons"
              style={{ fontSize: "40px" }}
            />
            <TelegramIcon
              className="soial-icons"
              style={{ fontSize: "40px" }}
            />
          </div>
        </div>
      </footer>

      <div className="copyrights">
        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;

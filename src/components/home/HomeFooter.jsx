import { Link } from 'react-router-dom';
import logoShape from '../../assets/figma/hero/logo-shape.svg';
import facebookIcon from '../../assets/figma/social/facebook.svg';
import twitterIcon from '../../assets/figma/social/twitter-x.svg';
import instagramIcon from '../../assets/figma/social/instagram.svg';
import data from '../../data/homepage.json';

export default function HomeFooter() {
  const { footer } = data;

  return (
    <footer id="contact" className="bg-navy">
      <div className="max-w-[1296px] mx-auto px-4 xl:px-[72px] pt-12 md:pt-[60px] pb-5">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-8 justify-between mb-10">
          {/* Column 1: Logo + Description + Social */}
          <div className="flex flex-col justify-between gap-6 max-w-[312px]">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="bg-accent-dark w-[80px] h-[80px] flex items-center justify-center overflow-hidden shrink-0">
                <img src={logoShape} alt="" className="w-1/2 h-1/2 object-contain" />
              </div>
              <span className="text-white font-semibold text-base uppercase leading-tight">
                Business<br />Consulting
              </span>
            </Link>
            <p className="text-white/80 text-base leading-5 line-clamp-3">
              {footer.description}
            </p>
            <div className="flex flex-col gap-5">
              <span className="text-light font-bold text-base">Subscribe Us</span>
              <div className="flex gap-3">
                <a href="#" className="bg-light rounded-full w-6 h-6 flex items-center justify-center hover:bg-white transition-colors">
                  <img src={facebookIcon} alt="Facebook" className="w-3 h-3" />
                </a>
                <a href="#" className="bg-light rounded-full w-6 h-6 flex items-center justify-center hover:bg-white transition-colors">
                  <img src={twitterIcon} alt="Twitter" className="w-3 h-3" />
                </a>
                <a href="#" className="bg-light rounded-full w-6 h-6 flex items-center justify-center hover:bg-white transition-colors">
                  <img src={instagramIcon} alt="Instagram" className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col gap-6">
            <h4 className="text-light font-bold text-base">Services</h4>
            <ul className="flex flex-col gap-6">
              {footer.services.map((service) => (
                <li key={service}>
                  <a href="#services" className="text-white/80 text-base hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-light font-bold text-base">Useful links</h4>
            <ul className="flex flex-col gap-6">
              {footer.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 text-base hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter + Contact */}
          <div className="flex flex-col justify-between gap-8 max-w-[394px]">
            <div className="flex flex-col gap-2">
              <h4 className="text-light font-bold text-base">
                {footer.newsletter.title}
              </h4>
              <p className="text-white/80 text-base">
                {footer.newsletter.subtitle}
              </p>
              <div className="flex gap-2 mt-1">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-white h-10 px-3 text-base text-navy/60 w-full max-w-[274px] outline-none"
                />
                <button className="bg-accent text-white font-semibold text-base h-10 px-5 flex-1 min-w-[100px] hover:bg-accent/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="flex gap-0">
              {/* Address */}
              <div className="flex flex-col gap-2 flex-1">
                <span className="text-light font-bold text-base">Address</span>
                <p className="text-white/80 text-base leading-relaxed w-[128px]">
                  {footer.contact.address}
                </p>
              </div>
              {/* Email + Phone */}
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex flex-col gap-2">
                  <span className="text-light font-bold text-base">Email</span>
                  <a href={`mailto:${footer.contact.email}`} className="text-white/80 text-base hover:text-white transition-colors">
                    {footer.contact.email}
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-light font-bold text-base">Phone</span>
                  <a href={`tel:${footer.contact.phone}`} className="text-white/80 text-base hover:text-white transition-colors">
                    {footer.contact.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-5 text-center">
          <p className="text-white/50 text-base">
            &copy;Copyright Business Consulting 2024. Design by Figma.guru
          </p>
        </div>
      </div>
    </footer>
  );
}

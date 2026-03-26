import { Link } from 'react-router-dom';
import skylineLogo from '../../assets/logos_skyline/SKY2blanco.png';
import instagramIcon from '../../assets/figma/social/instagram.svg';
import data from '../../data/homepage.json';

export default function HomeFooter() {
  const { footer } = data;

  return (
    <footer id="contact" className="bg-navy">
      <div className="max-w-[1296px] mx-auto px-4 xl:px-[72px] pt-12 md:pt-[60px] pb-5">
        {/* Main Footer Content */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-10">
          {/* Column 1: Logo + Description + Social */}
          <div className="col-span-12 md:col-span-4 flex flex-col justify-between gap-6">
            <Link to="/" className="flex items-center">
              <img src={skylineLogo} alt="Skyline" className="h-14 w-auto" />
            </Link>
            <p className="text-white/80 text-base leading-5 line-clamp-3">
              {footer.description}
            </p>
            <div className="flex flex-col gap-5">
              <span className="text-light font-bold text-base">Síguenos</span>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/company/skyline-it-mx/" target="_blank" rel="noopener noreferrer" className="bg-light rounded-full w-6 h-6 flex items-center justify-center hover:bg-white transition-colors">
                  <svg className="w-3 h-3" fill="#000" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://www.instagram.com/skylineit.mx/" target="_blank" rel="noopener noreferrer" className="bg-light rounded-full w-6 h-6 flex items-center justify-center hover:bg-white transition-colors">
                  <img src={instagramIcon} alt="Instagram" className="w-3 h-3" />
                </a>
                <a href="https://api.whatsapp.com/send/?phone=528447704939&text=Hola%2C+me+interesa+una+consulta+gratuita+para+mi+empresa" target="_blank" rel="noopener noreferrer" className="bg-light rounded-full w-6 h-6 flex items-center justify-center hover:bg-white transition-colors">
                  <svg className="w-3 h-3" fill="#000" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="col-span-6 md:col-span-2 flex flex-col gap-6">
            <h4 className="text-light font-bold text-base">Servicios</h4>
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
          <div className="col-span-6 md:col-span-2 flex flex-col gap-6">
            <h4 className="text-light font-bold text-base">Enlaces útiles</h4>
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
          <div className="col-span-12 md:col-span-4 flex flex-col justify-between gap-8">
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
                  placeholder="Tu correo electrónico"
                  className="bg-white h-10 px-3 text-base text-navy/60 w-full max-w-[274px] outline-none"
                />
                <button className="bg-accent text-white font-semibold text-base h-10 px-5 flex-1 min-w-[100px] hover:bg-accent/90 transition-colors">
                  Suscribirse
                </button>
              </div>
            </div>

            <div className="flex gap-0">
              {/* Address */}
              <div className="flex flex-col gap-2 flex-1">
                <span className="text-light font-bold text-base">Ubicación</span>
                <p className="text-white/80 text-base leading-relaxed w-[140px]">
                  {footer.contact.address}
                </p>
              </div>
              {/* Email + Phone */}
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex flex-col gap-2">
                  <span className="text-light font-bold text-base">Correo</span>
                  <a href={`mailto:${footer.contact.email}`} className="text-white/80 text-base hover:text-white transition-colors">
                    {footer.contact.email}
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-light font-bold text-base">Teléfono</span>
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
            &copy; 2025 Skyline Consulting. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { motion } from 'framer-motion';

import amazonLogo from '../../assets/companies/Amazon_logo.svg';
import metaLogo from '../../assets/companies/Meta_Platforms_Inc._logo.svg';
import serveLogo from '../../assets/companies/serve.png';
import konfioLogo from '../../assets/companies/konfio.png';

const companies = [
  { src: amazonLogo, alt: 'Amazon' },
  { src: metaLogo, alt: 'Meta' },
  { src: serveLogo, alt: 'Serve' },
  { src: konfioLogo, alt: 'Konfío' },
];

export default function CompanyLogos() {
  return (
    <section className="bg-white">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0 py-16 md:py-[100px]">
        <motion.p
          className="text-navy/50 text-base uppercase text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Nuestros consultores han colaborado con empresas líderes a nivel global
        </motion.p>

        <div className="grid grid-cols-12 gap-6 items-center">
          {companies.map((company, i) => (
            <motion.div
              key={company.alt}
              className="col-span-6 md:col-span-3 flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <img
                src={company.src}
                alt={company.alt}
                className="h-8 md:h-10 w-auto opacity-40 hover:opacity-80 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

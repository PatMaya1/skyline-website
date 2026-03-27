import { motion } from 'framer-motion';

import cloudPractitioner from '../../assets/certifications/cloud-practitioner.png';
import dataEngineer from '../../assets/certifications/data-engineer.png';
import developerAssociate from '../../assets/certifications/developer-associate.webp';
import solutionsArchitectAssociate from '../../assets/certifications/solutions-architect-associate.webp';
import solutionsArchitectPro from '../../assets/certifications/solutions-architect-pro.png';
import sysopsAdministrator from '../../assets/certifications/sysops-administrator.png';

const certifications = [
  { src: cloudPractitioner, alt: 'Cloud Practitioner' },
  { src: solutionsArchitectAssociate, alt: 'Solutions Architect Associate' },
  { src: solutionsArchitectPro, alt: 'Solutions Architect Professional' },
  { src: developerAssociate, alt: 'Developer Associate' },
  { src: sysopsAdministrator, alt: 'SysOps Administrator' },
  { src: dataEngineer, alt: 'Data Engineer' },
];

export default function Technologies() {
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
          Un equipo que domina AWS
        </motion.p>

        <div className="grid grid-cols-12 gap-6 items-center">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.alt}
              className="col-span-4 md:col-span-2 flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <img
                src={cert.src}
                alt={cert.alt}
                className="h-20 md:h-24 w-auto opacity-40 hover:opacity-80 transition-opacity"
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-navy/50 text-base uppercase text-center mt-10 md:mt-14"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          6+ certificaciones de AWS
        </motion.p>
      </div>
    </section>
  );
}

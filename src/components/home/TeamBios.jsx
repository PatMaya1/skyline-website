import { motion } from 'framer-motion';
import teamData from '../../data/team.json';

export default function TeamBios() {
  return (
    <section className="py-16 md:py-[120px] bg-white">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
        {/* Section Header */}
        <motion.div
          className="grid grid-cols-12 gap-6 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="col-span-12 text-navy/60 text-base uppercase">
            {teamData.label}
          </p>
          <h2 className="col-span-12 lg:col-span-7 text-navy font-semibold text-3xl md:text-[40px] leading-tight">
            {teamData.heading}
          </h2>
          <p className="col-span-12 lg:col-span-5 text-navy/60 text-base leading-relaxed lg:text-right">
            {teamData.description}
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {teamData.members.map((member, i) => (
            <motion.div
              key={member.name}
              className="col-span-12 md:col-span-4 bg-page p-8 flex flex-col gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Avatar with initials */}
              <div className="w-16 h-16 bg-navy flex items-center justify-center">
                <span className="text-white font-semibold text-xl">
                  {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </span>
              </div>

              {/* Name + Role */}
              <div className="flex flex-col gap-2">
                <h3 className="text-navy font-semibold text-xl">
                  {member.name}
                </h3>
                <p className="text-accent text-sm font-medium">
                  {member.role}
                </p>
              </div>

              {/* Bio */}
              <p className="text-navy/60 text-base leading-relaxed">
                {member.bio}
              </p>

              {/* Specialty tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {member.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="bg-navy/5 text-navy/70 text-xs font-medium px-3 py-1.5"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

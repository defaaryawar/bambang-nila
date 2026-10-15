import { motion } from 'framer-motion'
import { wedding } from '../../data/wedding'
import { EASE } from '../ui/ease'
import { SectionLabel, SplitText } from '../ui/motion'

/** Daftar "Turut Mengundang" dari kartu undangan. */
export function Invited() {
  return (
    <section className="bg-paper px-6 py-24 text-ink">
      <SectionLabel index="07">Turut Mengundang</SectionLabel>
      <h2 className="mt-6 font-serif text-[min(15cqw,64px)] leading-[0.95] tracking-[-0.03em]">
        <SplitText text="Bersama" className="block" />
        <SplitText text="keluarga besar" className="block italic" delay={0.1} />
      </h2>

      <ul className="mt-10 border-t border-ink/10">
        {wedding.invitedBy.map(([name, role], i) => (
          <motion.li
            key={name}
            className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7, ease: EASE, delay: (i % 4) * 0.04 }}
          >
            <span className="text-[13.5px] leading-snug">{name}</span>
            {role && <span className="max-w-[45%] shrink-0 text-right text-[11px] leading-snug text-stone">{role}</span>}
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

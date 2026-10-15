import { motion } from 'framer-motion'
import { photo, wedding } from '../../data/wedding'
import { EASE } from '../ui/ease'
import { FadeUp, ImageReveal, SectionLabel, SplitText } from '../ui/motion'

type Person = typeof wedding.bride

export function Couple() {
  return (
    <section id="mempelai" className="bg-paper px-6 py-24 text-ink">
      <SectionLabel index="01">Sang Mempelai</SectionLabel>

      <FadeUp className="mt-8 text-center">
        <p className="eyebrow text-[9px] text-stone">Bismillahirrahmanirrahim</p>
        <p className="mx-auto mt-4 max-w-[22ch] font-serif text-2xl leading-tight italic">{wedding.opening.salam}</p>
        <p className="mx-auto mt-4 max-w-[30ch] text-[13px] leading-relaxed text-stone">{wedding.opening.text}</p>
      </FadeUp>

      <div className="mt-14 space-y-6">
        <PersonBlock person={wedding.bride} role="The Bride" align="left" />

        <motion.div
          className="flex items-center justify-center gap-4 py-2"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <span className="h-px flex-1 bg-ink/10" />
          <span className="font-script text-6xl text-gold">&amp;</span>
          <span className="h-px flex-1 bg-ink/10" />
        </motion.div>

        <PersonBlock person={wedding.groom} role="The Groom" align="right" />
      </div>

      <FadeUp className="mx-auto mt-16 max-w-[32ch] text-center">
        <span className="mx-auto block h-8 w-px bg-gold/40" />
        <p className="mt-6 font-serif text-[19px] leading-[1.45] italic">{wedding.opening.prayer}</p>
      </FadeUp>
    </section>
  )
}

function PersonBlock({ person, role, align }: { person: Person; role: string; align: 'left' | 'right' }) {
  const right = align === 'right'
  return (
    <div className={`relative flex flex-col ${right ? 'items-end text-right' : 'items-start'}`}>
      <div className="relative w-[78%]">
        <ImageReveal
          src={photo(person.photo, 800, 1000)}
          alt={person.full}
          className="aspect-[4/5]"
          imgClassName="object-top"
          from={right ? 'right' : 'left'}
        />
        <span
          className={`eyebrow absolute top-4 ${right ? 'left-4' : 'right-4'} rounded-full bg-paper/85 px-3 py-1.5 text-[9px] text-ink backdrop-blur`}
        >
          {role}
        </span>
      </div>

      <h3 className="relative z-10 mt-5 font-serif text-[min(19cqw,84px)] leading-none tracking-[-0.04em] italic">
        <SplitText text={person.nick} />
      </h3>

      <FadeUp delay={0.15} className={`mt-3 max-w-[85%] ${right ? 'ml-auto' : ''}`}>
        <p className="text-[15px] font-medium">{person.full}</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-stone">{person.parents}</p>
      </FadeUp>
    </div>
  )
}

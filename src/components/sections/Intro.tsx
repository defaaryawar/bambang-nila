import { motion } from 'framer-motion'
import { photo, wedding } from '../../data/wedding'
import { EASE } from '../ui/ease'
import { FadeUp, ImageReveal, SplitText } from '../ui/motion'

export function Marquee({ dark }: { dark?: boolean }) {
  const item = (
    <span className="flex shrink-0 items-center gap-6 pr-6">
      <span className="italic">Nila</span>
      <span className="font-script text-[0.8em] text-gold">&amp;</span>
      <span>Bambang</span>
      <span className="h-px w-8 bg-current opacity-30" />
      <span className="tabular-nums">{wedding.dateNumeric}</span>
      <span className="h-px w-8 bg-current opacity-30" />
    </span>
  )
  return (
    <div
      className={`flex overflow-hidden border-y py-3 font-serif text-4xl whitespace-nowrap ${
        dark ? 'border-paper/10 bg-ink text-paper' : 'border-ink/10 bg-paper text-ink'
      }`}
      aria-hidden
    >
      <div className="flex" style={{ animation: 'marquee 22s linear infinite' }}>
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
  )
}

export function Quote() {
  return (
    <section className="relative overflow-hidden bg-bone px-7 py-24 text-ink">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -top-6 -left-2 font-serif text-[220px] leading-none text-ink/[0.05]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        “
      </motion.span>

      <div className="relative">
        <ImageReveal
          src={photo(wedding.photos.quote, 600, 800)}
          alt=""
          className="ml-auto aspect-[3/4] w-[58%]"
          from="right"
        />
        <p className="mt-10 font-serif text-[min(6.8cqw,28px)] leading-[1.25] italic">
          <SplitText text={wedding.quote.text} stagger={0.018} />
        </p>
        <FadeUp delay={0.4} className="mt-6 flex items-center gap-3">
          <span className="h-px w-8 bg-gold" />
          <span className="eyebrow text-gold">{wedding.quote.source}</span>
        </FadeUp>
      </div>
    </section>
  )
}

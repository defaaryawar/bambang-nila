import { motion } from 'framer-motion'
import { wedding } from '../../data/wedding'
import { EASE } from '../ui/ease'
import { FadeUp, SectionLabel, SplitText } from '../ui/motion'

/** Surat dari kedua mempelai untuk para tamu. */
export function Letter() {
  const { letter } = wedding
  return (
    <section id="surat" className="bg-bone px-6 py-24 text-ink">
      <SectionLabel index="05">Sepucuk Surat</SectionLabel>
      <h2 className="mt-6 font-serif text-[min(15cqw,64px)] leading-[0.95] tracking-[-0.03em]">
        <SplitText text="Dari kami," className="block" />
        <SplitText text="untuk Anda" className="block italic" delay={0.1} />
      </h2>

      <div className="mt-12 border-l border-gold/40 pl-5">
        <FadeUp>
          <p className="font-serif text-[22px] leading-snug italic">{letter.greeting}</p>
        </FadeUp>

        <div className="mt-6 space-y-5">
          {letter.paragraphs.map((para, i) => (
            <FadeUp key={i} delay={0.05}>
              <p
                className={`font-serif text-[19px] leading-[1.5] text-ink/85 ${
                  i === 0
                    ? 'first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:text-[64px] first-letter:leading-[0.8] first-letter:text-gold first-letter:italic'
                    : ''
                }`}
              >
                {para}
              </p>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-10">
          <p className="text-[13px] text-stone">{letter.closing}</p>
          <div className="mt-3 flex items-center gap-4">
            <p className="font-script text-[44px] leading-none text-gold">
              {wedding.bride.nick} &amp; {wedding.groom.nick}
            </p>
            <motion.span
              className="grid size-14 shrink-0 place-items-center rounded-full bg-ink font-serif text-lg text-paper italic shadow-[inset_0_0_0_3px_rgba(247,239,233,0.15)]"
              initial={{ scale: 0, rotate: -40 }}
              whileInView={{ scale: 1, rotate: -12 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.3 }}
              aria-hidden
            >
              {wedding.bride.nick[0]}&amp;{wedding.groom.nick[0]}
            </motion.span>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/** Janji kecil kedua mempelai + doa untuk pengantin. */
export function Promises() {
  return (
    <section id="janji" className="bg-paper px-6 py-24 text-ink">
      <SectionLabel index="06">Janji &amp; Doa</SectionLabel>
      <h2 className="mt-6 font-serif text-[min(15cqw,64px)] leading-[0.95] tracking-[-0.03em]">
        <SplitText text="Janji kecil" className="block" />
        <SplitText text="kami berdua" className="block italic" delay={0.1} />
      </h2>
      <FadeUp>
        <p className="mt-5 max-w-[34ch] text-[13px] leading-relaxed text-stone">
          Bukan janji yang besar, hanya hal-hal sederhana yang ingin kami jaga setiap hari.
        </p>
      </FadeUp>

      <ol className="mt-10 border-t border-ink/10">
        {wedding.promises.map((p, i) => (
          <motion.li
            key={i}
            className="flex gap-5 border-b border-ink/10 py-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <span className="w-7 shrink-0 pt-0.5 font-serif text-[22px] leading-none text-gold italic tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="font-serif text-[20px] leading-[1.35]">{p}</p>
          </motion.li>
        ))}
      </ol>

      <FadeUp className="grain relative mt-14 overflow-hidden rounded-[28px] bg-ink px-6 py-10 text-center text-paper">
        <p className="eyebrow text-paper/50">Doa untuk kedua mempelai</p>
        <p dir="rtl" lang="ar" className="mt-6 text-[26px] leading-[1.9]">
          {wedding.prayer.arabic}
        </p>
        <p className="mx-auto mt-5 max-w-[32ch] font-serif text-[19px] leading-[1.45] italic">
          “{wedding.prayer.meaning}”
        </p>
        <p className="eyebrow mt-6 text-[9px] text-gold-soft">{wedding.prayer.source}</p>
      </FadeUp>
    </section>
  )
}

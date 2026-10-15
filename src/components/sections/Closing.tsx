import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type RefObject } from 'react'
import { photo, wedding } from '../../data/wedding'
import { FadeUp, SplitText } from '../ui/motion'

export function Closing({ scroller }: { scroller: RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, container: scroller, offset: ['start end', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1])

  return (
    <section ref={ref} className="grain relative flex min-h-dvh flex-col overflow-hidden bg-ink text-paper">
      <motion.img
        src={photo(wedding.photos.closing, 900, 1500)}
        alt=""
        style={{ scale }}
        className="photo-tone absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/70 to-ink" />

      <div className="relative mt-auto px-7 pt-40 pb-16">
        <FadeUp>
          <p className="eyebrow text-paper/60">Terima kasih</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mt-5 max-w-[36ch] text-[13.5px] leading-relaxed text-paper/75">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan
            doa restu kepada kami.
          </p>
          <p className="mt-5 font-serif text-xl italic">Wassalamu’alaikum Wr. Wb.</p>
        </FadeUp>

        <p className="eyebrow mt-12 text-paper/50">Kami yang berbahagia</p>
        <FadeUp delay={0.1} className="mt-4 space-y-1">
          {wedding.families.map((f) => (
            <p key={f} className="text-[13px] leading-relaxed text-paper/75">
              {f}
            </p>
          ))}
        </FadeUp>
        <h2 className="mt-6 font-serif text-[min(21cqw,92px)] leading-[0.86] tracking-[-0.04em]">
          <SplitText text={wedding.bride.nick} className="block italic" />
          <span className="flex items-baseline gap-3">
            <span className="font-script text-[0.6em] text-gold-soft">&amp;</span>
            <SplitText text={wedding.groom.nick} delay={0.1} />
          </span>
        </h2>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-paper px-7 pt-10 pb-[calc(env(safe-area-inset-bottom)+112px)] text-ink">
      <div className="border-t border-ink/10 pt-8 text-center">
        <p className="eyebrow text-[9px] text-stone">Undangan digital oleh</p>
        <motion.div
          className="mt-4 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="font-serif text-[26px] leading-none italic">kisahframe</span>
          <span className="text-sm text-gold">×</span>
          <span className="text-[19px] leading-none font-semibold tracking-[-0.04em]">
            defano<span className="font-light text-stone">labs</span>
          </span>
        </motion.div>
        <p className="mt-6 text-[10px] leading-relaxed text-stone/80">
          © 2026 · Musik: Debussy, Satie (public domain) · “Canon in D” Kevin MacLeod, CC BY 3.0
        </p>
      </div>
    </footer>
  )
}

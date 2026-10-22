import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef, type RefObject } from 'react'
import { photo, wedding } from '../../data/wedding'
import { FadeUp, ImageReveal, SectionLabel, SplitText } from '../ui/motion'

export function Story({ scroller }: { scroller: RefObject<HTMLElement | null> }) {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, container: scroller, offset: ['start 75%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="kisah" className="relative overflow-hidden bg-paper px-6 py-24 text-ink">
      <SectionLabel index="04">
        Love Story
      </SectionLabel>
      <h2 className="mt-6 font-serif text-[min(15cqw,64px)] leading-[0.95] tracking-[-0.03em]">
        <SplitText text="Cerita" className="block" />
        <SplitText text="tentang kita" className="block italic" delay={0.1} />
      </h2>

      <ol ref={listRef} className="relative mt-14 space-y-16 pl-8">
        <span className="absolute top-2 bottom-2 left-[5px] w-px bg-ink/10" />
        <motion.span
          className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-gold"
          style={{ scaleY: line }}
        />

        {wedding.story.map((s) => (
          <li key={s.year} className="relative">
            <motion.span
              className="absolute top-3 -left-8 size-[11px] rounded-full border border-gold bg-paper"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1, backgroundColor: '#8f6d3c' }}
              viewport={{ once: true, amount: 1, margin: '0px 0px -30% 0px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            />
            <FadeUp>
              <span
                className="block font-serif text-[64px] leading-none tracking-[-0.03em] text-transparent italic"
                style={{ WebkitTextStroke: '1px rgba(28,26,23,0.32)' }}
              >
                {s.year}
              </span>
              <h3 className="mt-2 font-serif text-[28px] leading-tight">{s.title}</h3>
            </FadeUp>
            {s.photo && (
              <ImageReveal src={photo(s.photo, 900)} alt={s.title} className="mt-5 aspect-[3/2] rounded-[2px]" from="left" />
            )}
            <div className="mt-4 space-y-3">
              {s.text.map((para, j) => (
                <FadeUp key={j} delay={0.08 * (j + 1)}>
                  <p className="text-[14px] leading-[1.75] text-ink/75">{para}</p>
                </FadeUp>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

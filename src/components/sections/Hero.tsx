import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, type RefObject } from 'react'
import { photo, wedding } from '../../data/wedding'
import { EASE, EASE_CURTAIN } from '../ui/ease'
import { SplitText } from '../ui/motion'

type Props = { scroller: RefObject<HTMLElement | null>; play: boolean }

export function Hero({ scroller, play }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, container: scroller, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: play ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, ease: EASE, delay },
  })

  return (
    <section ref={ref} id="home" className="relative bg-paper text-ink">
      {/* Foto full-bleed, bagian bawahnya memudar ke latar */}
      <motion.div
        className="relative h-[64dvh] min-h-[440px] overflow-hidden"
        initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
        animate={play ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
        transition={{ duration: 1.6, ease: EASE_CURTAIN, delay: 0.3 }}
      >
        <motion.img
          src={photo(wedding.photos.hero, 1000)}
          alt="Nila & Bambang"
          style={{ y: imgY }}
          className="photo-tone absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover object-[50%_40%]"
          initial={{ scale: 1.2 }}
          animate={play ? { scale: 1 } : undefined}
          transition={{ duration: 2.4, ease: EASE, delay: 0.3 }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-paper from-15% via-paper/70 to-transparent" />
        <RotatingBadge play={play} />
      </motion.div>

      <div className="relative -mt-14 px-6 pb-16 text-center">
        <motion.p className="eyebrow text-stone" {...fade(0.9)}>
          We're getting married
        </motion.p>

        <h2 className="mt-4 font-serif text-[min(19cqw,84px)] leading-[0.9] tracking-[-0.035em]">
          <SplitText text={wedding.bride.nick} className="block italic" play={play} delay={1} />
          <motion.span
            className="my-1 block font-script text-[0.5em] leading-none text-gold"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={play ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 1.2 }}
          >
            &amp;
          </motion.span>
          <SplitText text={wedding.groom.nick} className="block" play={play} delay={1.1} />
        </h2>

        <motion.span
          className="mx-auto mt-7 block h-px w-12 origin-center bg-gold"
          initial={{ scaleX: 0 }}
          animate={play ? { scaleX: 1 } : undefined}
          transition={{ duration: 1.2, ease: EASE, delay: 1.4 }}
        />

        <motion.p className="mt-6 font-serif text-[22px] italic" {...fade(1.5)}>
          {wedding.dateLabel}
        </motion.p>
        <motion.p className="mt-1.5 text-[12px] tracking-wide text-stone" {...fade(1.6)}>
          {wedding.events[1].venue} · {wedding.city}
        </motion.p>

        <ScrollHint progress={scrollYProgress} play={play} />
      </div>
    </section>
  )
}

/** Badge teks melingkar yang berputar pelan di pojok kiri atas foto. */
function RotatingBadge({ play }: { play: boolean }) {
  const text = `save the date · ${wedding.dateWords} · `
  return (
    <motion.div
      className="absolute top-[calc(env(safe-area-inset-top)+16px)] left-5 grid size-[88px] place-items-center rounded-full bg-paper/85 text-ink backdrop-blur-md"
      initial={{ scale: 0, rotate: -90 }}
      animate={play ? { scale: 1, rotate: 0 } : undefined}
      transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 1.6 }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" style={{ animation: 'spin-slow 18s linear infinite' }}>
        <defs>
          <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        {/* textLength = keliling lingkaran (2π·37) supaya teks pas satu putaran */}
        <text className="fill-current text-[8.6px] uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
          <textPath href="#badge-circle" textLength="230" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="font-serif text-2xl italic">N&amp;B</span>
    </motion.div>
  )
}

function ScrollHint({ progress, play }: { progress: MotionValue<number>; play: boolean }) {
  const opacity = useTransform(progress, [0, 0.15], [1, 0])
  return (
    <motion.div style={{ opacity }} className="mt-10 flex flex-col items-center gap-3">
      <motion.span
        className="eyebrow text-[9px] text-stone"
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : undefined}
        transition={{ delay: 2 }}
      >
        Gulir ke bawah
      </motion.span>
      <span className="relative h-10 w-px overflow-hidden bg-ink/10">
        <motion.span
          className="absolute inset-x-0 top-0 h-1/2 bg-ink"
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: EASE_CURTAIN }}
        />
      </span>
    </motion.div>
  )
}

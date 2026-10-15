import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

import { EASE, EASE_CURTAIN } from './ease'

const VIEWPORT = { once: true, amount: 0.35 } as const

type SplitProps = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  /** `true`/`false` untuk kontrol manual, kosongkan agar jalan saat masuk layar */
  play?: boolean
}

/** Teks yang muncul kata per kata dari balik mask. */
export function SplitText({ text, className, delay = 0, stagger = 0.06, play }: SplitProps) {
  const words = text.split(' ')
  const parent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const child: Variants = {
    hidden: { y: '110%', rotate: 4 },
    show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: EASE } },
  }
  const trigger =
    play === undefined
      ? { whileInView: 'show', viewport: VIEWPORT }
      : { animate: play ? 'show' : 'hidden' }

  return (
    <motion.span
      className={className}
      variants={parent}
      initial="hidden"
      aria-label={text}
      {...trigger}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span variants={child} className="inline-block origin-bottom-left">
            {w}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

type FadeProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export function FadeUp({ children, className, delay = 0, y = 28 }: FadeProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

type ImageRevealProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  delay?: number
  from?: 'bottom' | 'top' | 'left' | 'right'
}

const CLIP_FROM = {
  bottom: 'inset(100% 0% 0% 0%)',
  top: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
}

/**
 * Foto yang terbuka seperti tirai kecil, sambil zoom-out pelan.
 * Pemicu in-view dipasang di wrapper luar yang TIDAK di-clip: elemen yang
 * clip-path-nya 0 dianggap tidak terlihat oleh IntersectionObserver, jadi
 * animasinya tidak akan pernah jalan kalau dipasang di elemen yang di-clip.
 */
export function ImageReveal({ src, alt, className, imgClassName, delay = 0, from = 'bottom' }: ImageRevealProps) {
  return (
    <motion.div
      className={`relative ${className ?? ''}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        variants={{
          hidden: { clipPath: CLIP_FROM[from] },
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.4, ease: EASE_CURTAIN, delay } },
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          draggable={false}
          className={`photo-tone h-full w-full object-cover ${imgClassName ?? ''}`}
          variants={{
            hidden: { scale: 1.25 },
            show: { scale: 1, transition: { duration: 2, ease: EASE, delay } },
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export function SectionLabel({ index, children, light }: { index: string; children: ReactNode; light?: boolean }) {
  return (
    <FadeUp className={`eyebrow flex items-center gap-3 ${light ? 'text-paper/60' : 'text-stone'}`} y={12}>
      <span className="tabular-nums">{index}</span>
      <motion.span
        className={`h-px w-10 origin-left ${light ? 'bg-paper/40' : 'bg-stone/60'}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      />
      <span>{children}</span>
    </FadeUp>
  )
}

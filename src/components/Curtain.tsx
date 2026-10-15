import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { EASE, EASE_CURTAIN } from './ui/ease'

const WORD = 'kisahframe'
const MIN_SHOW = 2100

type Props = {
  /** URL gambar yang ditunggu sebelum tirai dibuka */
  preload: string[]
  onOpenStart: () => void
  onDone: () => void
}

/**
 * Tirai pembuka: layar terbelah jadi dua panel (atas & bawah).
 * Wordmark "kisahframe" duduk tepat di garis belahan, jadi saat tirai
 * terbuka hurufnya ikut terbelah dua.
 */
export function Curtain({ preload, onOpenStart, onDone }: Props) {
  const [open, setOpen] = useState(false)
  const progress = useMotionValue(0)
  const percent = useTransform(progress, (v) => `${Math.round(v * 100)}`.padStart(3, '0'))

  useEffect(() => {
    let alive = true
    const started = performance.now()
    const loads = preload.map(
      (src) =>
        new Promise<void>((res) => {
          const img = new Image()
          img.onload = img.onerror = () => res()
          img.src = src
        }),
    )
    const fonts = document.fonts?.ready ?? Promise.resolve()
    const timeout = new Promise<void>((res) => setTimeout(res, 5000))

    // Progress naik pelan sampai 90%, sisanya nunggu aset selesai
    const fake = animate(progress, 0.9, { duration: MIN_SHOW / 1000, ease: [0.3, 0, 0.2, 1] })

    Promise.race([Promise.all([...loads, fonts]), timeout]).then(() => {
      const wait = Math.max(0, MIN_SHOW - (performance.now() - started))
      setTimeout(() => {
        if (!alive) return
        fake.stop()
        animate(progress, 1, { duration: 0.45, ease: 'easeOut' }).then(() => {
          if (!alive) return
          setOpen(true)
          onOpenStart()
        })
      }, wait)
    })

    return () => {
      alive = false
      fake.stop()
    }
    // Sekali jalan saat mount; preload & callback tidak berubah
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const panel = (side: 'top' | 'bottom') => (
    <motion.div
      className={`absolute inset-x-0 h-1/2 overflow-hidden bg-paper ${side === 'top' ? 'top-0' : 'bottom-0'}`}
      animate={open ? { y: side === 'top' ? '-100%' : '100%' } : { y: '0%' }}
      transition={{ duration: 1.5, ease: EASE_CURTAIN, delay: 0.25 }}
      onAnimationComplete={() => side === 'top' && open && onDone()}
    >
      {/* Wordmark diposisikan di tengah layar; tiap panel cuma nampilin setengahnya */}
      <div
        className="absolute inset-x-0 flex justify-center"
        style={{ top: side === 'top' ? '100%' : '0%', transform: 'translateY(-50%)' }}
      >
        <Wordmark />
      </div>

      {side === 'top' ? (
        <motion.div
          className="eyebrow absolute inset-x-0 top-[max(env(safe-area-inset-top),28px)] flex justify-between px-6 text-stone md:px-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 0.8, delay: open ? 0 : 0.4 }}
        >
          <span>Undangan Digital</span>
          <span>Est. 2026</span>
        </motion.div>
      ) : (
        <motion.div
          className="eyebrow absolute inset-x-0 bottom-[max(env(safe-area-inset-bottom),28px)] flex items-end justify-between px-6 text-stone md:px-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 0.8, delay: open ? 0 : 0.4 }}
        >
          <span>Nila &amp; Bambang</span>
          <span className="font-serif text-3xl tracking-normal text-ink/80 tabular-nums">
            <motion.span>{percent}</motion.span>
          </span>
        </motion.div>
      )}
    </motion.div>
  )

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden={open}>
      {panel('top')}
      {panel('bottom')}

      {/* Garis belahan = progress bar */}
      <motion.div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/10"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="h-full origin-left bg-ink/60" style={{ scaleX: progress }} />
      </motion.div>
    </div>
  )
}

function Wordmark() {
  return (
    <motion.span
      className="flex font-serif text-[clamp(56px,17vw,168px)] leading-none tracking-[-0.03em] text-ink italic"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: 0.25 } } }}
    >
      {WORD.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: '0.35em', filter: 'blur(8px)' },
            show: { opacity: 1, y: '0em', filter: 'blur(0px)', transition: { duration: 1.1, ease: EASE } },
          }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  )
}

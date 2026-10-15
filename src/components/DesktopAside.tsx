import { motion } from 'framer-motion'
import { photo, wedding } from '../data/wedding'
import { useCountdown } from '../hooks/useCountdown'
import { EASE } from './ui/ease'
import { SplitText } from './ui/motion'

/** Panel kiri di desktop/tablet: foto mempelai full + nama besar. */
export function DesktopAside({ play }: { play: boolean }) {
  const t = useCountdown(wedding.date)

  return (
    <aside className="grain relative hidden flex-1 overflow-hidden bg-ink text-paper md:block">
      <motion.img
        src={photo(wedding.photos.aside, 2000)}
        alt=""
        className="photo-tone absolute inset-0 size-full object-cover object-[50%_65%]"
        initial={{ scale: 1.2 }}
        animate={play ? { scale: [1.2, 1.04, 1.1] } : undefined}
        transition={{ duration: 30, times: [0, 0.3, 1], ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-ink/85 via-ink/30 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-ink/70 to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-10 lg:p-14">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={play ? { opacity: 1 } : undefined}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <span className="font-serif text-2xl italic">kisahframe</span>
          <span className="eyebrow text-paper/60">{wedding.dateShort}</span>
        </motion.div>

        <div>
          <motion.p
            className="eyebrow text-paper/60"
            initial={{ opacity: 0, y: 14 }}
            animate={play ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
          >
            The Wedding of
          </motion.p>
          <h2 className="mt-4 font-serif text-[clamp(64px,8.5vw,168px)] leading-[0.85] tracking-[-0.04em]">
            <SplitText text={wedding.bride.nick} className="italic" play={play} delay={0.8} />{' '}
            <span className="font-script text-[0.55em] text-gold-soft">&amp;</span>
            <br />
            <SplitText text={wedding.groom.nick} play={play} delay={0.95} />
          </h2>

          <motion.div
            className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-6"
            initial={{ opacity: 0, y: 14 }}
            animate={play ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 1.3 }}
          >
            <div>
              <p className="eyebrow text-paper/50">Save the date</p>
              <p className="mt-2 text-lg">{wedding.dateLabel}</p>
            </div>
            <div className="hidden gap-6 lg:flex">
              {(
                [
                  [t.days, 'Hari'],
                  [t.hours, 'Jam'],
                  [t.minutes, 'Menit'],
                  [t.seconds, 'Detik'],
                ] as const
              ).map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="font-serif text-4xl tabular-nums">{String(v).padStart(2, '0')}</p>
                  <p className="eyebrow mt-1 text-[9px] text-paper/45">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </aside>
  )
}

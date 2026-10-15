import { motion } from 'framer-motion'
import { ArrowRight, MailOpen } from 'lucide-react'
import { photo, wedding } from '../data/wedding'
import { EASE, EASE_CURTAIN } from './ui/ease'
import { SplitText } from './ui/motion'

type Props = {
  guest: string | null
  /** true setelah tirai mulai terbuka */
  play: boolean
  onOpen: () => void
}

export function Cover({ guest, play, onOpen }: Props) {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: play ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1.1, ease: EASE, delay },
  })

  return (
    <motion.section
      className="grain absolute inset-0 z-30 overflow-hidden bg-ink text-paper"
      exit={{ y: '-100%', transition: { duration: 1.3, ease: EASE_CURTAIN } }}
    >
      {/* Foto latar dengan efek Ken Burns */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={play ? { scale: 1 } : undefined}
        transition={{ duration: 9, ease: [0.2, 0.6, 0.2, 1] }}
      >
        <img
          src={photo(wedding.photos.cover, 1000)}
          alt="Nila dan Bambang"
          className="photo-tone absolute inset-x-0 -top-[26%] h-[114%] w-full object-cover object-[50%_80%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/90" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/80 to-transparent" />

      <div className="relative flex h-full flex-col px-7 pt-[calc(env(safe-area-inset-top)+28px)] pb-[calc(env(safe-area-inset-bottom)+32px)]">
        <motion.div className="eyebrow flex justify-between text-paper/70" {...fade(0.5)}>
          <span>Undangan Pernikahan</span>
          <span className="tabular-nums">{wedding.dateShort}</span>
        </motion.div>

        <div className="mt-auto">
          <motion.p className="eyebrow text-paper/60" {...fade(0.7)}>
            The Wedding of
          </motion.p>

          <h1 className="mt-3 font-serif leading-[0.86] tracking-[-0.035em]">
            <SplitText text={wedding.bride.nick} className="block text-[min(22cqw,96px)] italic" play={play} delay={0.8} />
            <span className="flex items-baseline gap-3">
              <motion.span
                className="font-script text-[min(12cqw,52px)] text-gold-soft"
                initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                animate={play ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
                transition={{ duration: 1.2, ease: EASE, delay: 1.15 }}
              >
                &amp;
              </motion.span>
              <SplitText text={wedding.groom.nick} className="block text-[min(22cqw,96px)]" play={play} delay={1} />
            </span>
          </h1>

          <motion.div className="mt-5 flex items-center gap-3 text-sm text-paper/80" {...fade(1.3)}>
            <span className="h-px w-8 bg-paper/50" />
            {wedding.dateLabel}
          </motion.div>

          <motion.div className="mt-8 border-t border-paper/15 pt-5" {...fade(1.5)}>
            {guest ? (
              <>
                <p className="text-xs text-paper/55">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                <p className="mt-1.5 font-serif text-[28px] leading-tight">{guest}</p>
                <p className="mt-1 text-[10px] text-paper/40 italic">
                  *Mohon maaf apabila ada kesalahan penulisan nama & gelar
                </p>
              </>
            ) : (
              <>
                <p className="text-xs text-paper/55">Kepada Yth.</p>
                <p className="mt-1.5 font-serif text-[28px] leading-tight">Bapak/Ibu/Saudara/i</p>
                <p className="mt-1 text-xs text-paper/55">di Tempat</p>
              </>
            )}
          </motion.div>

          <motion.button
            {...fade(1.7)}
            whileTap={{ scale: 0.96 }}
            onClick={onOpen}
            className="group relative mt-7 flex w-full items-center justify-between overflow-hidden rounded-full bg-paper py-2 pr-2 pl-6 text-ink"
          >
            <span className="flex items-center gap-2.5 text-[13px] font-medium tracking-wide">
              <MailOpen className="size-4" strokeWidth={1.6} />
              Buka Undangan
            </span>
            <span className="grid size-10 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover:translate-x-0.5">
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:-rotate-45" />
            </span>
            {/* kilau tipis yang lewat berkala */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              animate={play ? { x: ['0%', '450%'] } : undefined}
              transition={{ duration: 1.6, ease: 'easeInOut', delay: 2.6, repeat: Infinity, repeatDelay: 3.2 }}
            />
          </motion.button>
        </div>
      </div>
    </motion.section>
  )
}

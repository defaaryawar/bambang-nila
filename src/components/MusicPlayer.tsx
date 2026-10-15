import { AnimatePresence, motion } from 'framer-motion'
import { ChevronUp, Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { photo, wedding } from '../data/wedding'
import type { AudioPlayer } from '../hooks/useAudioPlayer'
import { EASE } from './ui/ease'

const SPRING = { type: 'spring', stiffness: 420, damping: 38, mass: 0.9 } as const

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s <= 0) return '0:00'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

/**
 * Pemutar musik mini yang "ngintip" dari pojok kanan atas.
 * Tap untuk membuka kartu ala Spotify (cover, progress, kontrol, playlist).
 */
export function MusicPlayer({ player }: { player: AudioPlayer }) {
  const [expanded, setExpanded] = useState(false)
  const [announce, setAnnounce] = useState(false)
  const lastTrack = useRef<number | null>(null)

  // Saat lagu mulai/berganti, pill melebar sebentar menampilkan judul
  useEffect(() => {
    if (!player.playing || lastTrack.current === player.index) return
    lastTrack.current = player.index
    setAnnounce(true)
    const t = setTimeout(() => setAnnounce(false), 3600)
    return () => clearTimeout(t)
  }, [player.playing, player.index])

  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.button
            key="scrim"
            aria-label="Tutup pemutar musik"
            className="absolute inset-0 z-40 cursor-default bg-ink/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute top-[calc(env(safe-area-inset-top)+14px)] right-0 z-50 flex justify-end">
        <AnimatePresence initial={false} mode="popLayout">
          {expanded ? (
            <ExpandedCard key="card" player={player} onClose={() => setExpanded(false)} />
          ) : (
            <Peek key="peek" player={player} announce={announce} onOpen={() => setExpanded(true)} />
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

function Peek({ player, announce, onOpen }: { player: AudioPlayer; announce: boolean; onOpen: () => void }) {
  return (
    <motion.button
      layoutId="player-shell"
      transition={SPRING}
      onClick={onOpen}
      aria-label={`Musik: ${player.track.title}. Buka pemutar`}
      className="pointer-events-auto flex items-center gap-2.5 border border-r-0 border-paper/15 bg-ink/65 py-1.5 pr-3 pl-1.5 text-paper shadow-[0_8px_30px_rgba(20,18,15,0.35)] backdrop-blur-xl"
      style={{ borderRadius: '999px 0 0 999px' }}
      initial={{ x: 80 }}
      animate={{ x: 0 }}
      exit={{ opacity: 0 }}
    >
      <Disc src={photo(player.track.cover, 120, 120)} spinning={player.playing} />
      <AnimatePresence initial={false}>
        {announce && (
          <motion.span
            className="flex flex-col items-start overflow-hidden text-left whitespace-nowrap"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="text-[8px] tracking-[0.28em] text-paper/50 uppercase">Now playing</span>
            <span className="font-serif text-[15px] leading-tight italic">{player.track.title}</span>
          </motion.span>
        )}
      </AnimatePresence>
      <Equalizer playing={player.playing} />
    </motion.button>
  )
}

function ExpandedCard({ player, onClose }: { player: AudioPlayer; onClose: () => void }) {
  const ratio = player.duration ? player.time / player.duration : 0

  const onSeek = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    player.seek(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)))
  }

  return (
    <motion.div
      layoutId="player-shell"
      transition={SPRING}
      className="pointer-events-auto mr-3 w-[min(320px,calc(100vw-24px))] overflow-hidden border border-paper/10 bg-ink/90 text-paper shadow-[0_24px_60px_rgba(20,18,15,0.5)] backdrop-blur-2xl"
      style={{ borderRadius: 26 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.12, duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
        className="p-4"
      >
        <div className="flex items-center justify-between">
          <span className="eyebrow text-paper/45">Now playing</span>
          <button
            onClick={onClose}
            aria-label="Kecilkan pemutar"
            className="-mr-1 grid size-8 place-items-center rounded-full text-paper/60 transition hover:bg-paper/10 hover:text-paper"
          >
            <ChevronUp className="size-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-3.5">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={player.track.cover}
                src={photo(player.track.cover, 200, 200)}
                alt=""
                className="photo-tone absolute inset-0 size-full object-cover"
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </AnimatePresence>
          </div>
          <div className="min-w-0">
            <p className="truncate font-serif text-[22px] leading-tight">{player.track.title}</p>
            <p className="truncate text-xs text-paper/50">{player.track.artist}</p>
          </div>
        </div>

        <div className="mt-4">
          <div
            role="slider"
            aria-label="Posisi lagu"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(ratio * 100)}
            tabIndex={0}
            onPointerDown={onSeek}
            className="group relative flex h-4 cursor-pointer touch-none items-center"
          >
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-paper/15">
              <div className="h-full rounded-full bg-paper" style={{ width: `${ratio * 100}%` }} />
            </div>
            <div
              className="absolute size-2.5 -translate-x-1/2 rounded-full bg-paper opacity-0 transition group-hover:opacity-100"
              style={{ left: `${ratio * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-paper/45 tabular-nums">
            <span>{fmt(player.time)}</span>
            <span>{fmt(player.duration)}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-6">
          <button onClick={player.prev} aria-label="Lagu sebelumnya" className="text-paper/70 transition hover:text-paper">
            <SkipBack className="size-5 fill-current" />
          </button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={player.toggle}
            aria-label={player.playing ? 'Jeda' : 'Putar'}
            className="grid size-12 place-items-center rounded-full bg-paper text-ink"
          >
            {player.playing ? <Pause className="size-5 fill-current" /> : <Play className="ml-0.5 size-5 fill-current" />}
          </motion.button>
          <button onClick={player.next} aria-label="Lagu berikutnya" className="text-paper/70 transition hover:text-paper">
            <SkipForward className="size-5 fill-current" />
          </button>
        </div>

        <div className="mt-4 border-t border-paper/10 pt-3">
          <p className="eyebrow mb-1.5 text-paper/40">Playlist</p>
          <ul>
            {wedding.playlist.map((t, i) => {
              const active = i === player.index
              return (
                <li key={t.src}>
                  <button
                    onClick={() => player.select(i)}
                    className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-paper/5 ${active ? 'text-paper' : 'text-paper/55'}`}
                  >
                    <span className="grid w-4 place-items-center text-[11px] tabular-nums">
                      {active ? <Equalizer playing={player.playing} small /> : i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate text-sm ${active ? 'text-gold-soft' : ''}`}>{t.title}</span>
                      <span className="block truncate text-[11px] text-paper/40">{t.artist}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Disc({ src, spinning }: { src: string; spinning: boolean }) {
  return (
    <span
      className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full ring-1 ring-paper/20"
      style={{ animation: 'spin-slow 6s linear infinite', animationPlayState: spinning ? 'running' : 'paused' }}
    >
      <img src={src} alt="" className="photo-tone absolute inset-0 size-full object-cover" />
      <span className="absolute inset-0 rounded-full bg-[repeating-radial-gradient(circle,transparent_0_2px,rgba(20,18,15,0.12)_2px_3px)]" />
      <span className="relative size-2 rounded-full bg-ink ring-2 ring-paper/70" />
    </span>
  )
}

function Equalizer({ playing, small }: { playing: boolean; small?: boolean }) {
  const h = small ? 'h-3' : 'h-4'
  return (
    <span className={`flex items-end gap-[2px] ${h}`} aria-hidden>
      {[0, 0.25, 0.5, 0.15].map((d, i) => (
        <span
          key={i}
          className={`w-[2px] origin-bottom rounded-full bg-current ${h}`}
          style={{
            animation: `eq ${0.9 + i * 0.12}s ease-in-out ${d}s infinite`,
            animationPlayState: playing ? 'running' : 'paused',
            transform: playing ? undefined : 'scaleY(0.3)',
          }}
        />
      ))}
    </span>
  )
}

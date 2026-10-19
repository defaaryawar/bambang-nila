import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, CalendarPlus, Clock, MapPin } from 'lucide-react'
import { useRef, type RefObject } from 'react'
import { photo, wedding } from '../../data/wedding'
import { useCountdown } from '../../hooks/useCountdown'
import { EASE } from '../ui/ease'
import { FadeUp, SectionLabel, SplitText } from '../ui/motion'

type WeddingEvent = (typeof wedding.events)[number]

const calendarUrl = (e: WeddingEvent) =>
  'https://calendar.google.com/calendar/render?' +
  new URLSearchParams({
    action: 'TEMPLATE',
    text: `${e.title} — Nila & Bambang`,
    dates: `${e.start}/${e.end}`,
    details: 'Undangan pernikahan Nila & Bambang',
    location: `${e.venue}, ${e.address}`,
  })

export function SaveTheDate({ scroller }: { scroller: RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLElement>(null)
  const t = useCountdown(wedding.date)
  const { scrollYProgress } = useScroll({ target: ref, container: scroller, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  const cells = [
    [t.days, 'Hari'],
    [t.hours, 'Jam'],
    [t.minutes, 'Menit'],
    [t.seconds, 'Detik'],
  ] as const

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-ink px-6 py-28 text-paper">
      <motion.img
        src={photo(wedding.photos.saveTheDate, 900, 1400)}
        alt=""
        style={{ y }}
        className="photo-tone absolute inset-x-0 top-[-12%] h-[124%] w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" />

      <div className="relative text-center">
        <FadeUp>
          <p className="eyebrow text-paper/60">Save the date</p>
        </FadeUp>
        <h2 className="mt-4 font-serif text-[min(15cqw,64px)] leading-[0.95] tracking-[-0.03em]">
          <SplitText text="Menghitung" className="block" />
          <SplitText text="hari bahagia" className="block italic" delay={0.1} />
        </h2>

        <FadeUp delay={0.2} className="mt-10 grid grid-cols-4 gap-2">
          {cells.map(([v, l]) => (
            <div key={l} className="rounded-2xl border border-paper/12 bg-paper/[0.04] py-4 backdrop-blur-md">
              <RollingNumber value={v} />
              <p className="eyebrow mt-1.5 text-[8.5px] text-paper/50">{l}</p>
            </div>
          ))}
        </FadeUp>

        <FadeUp delay={0.3}>
          <a
            href={calendarUrl(wedding.events[0])}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-[13px] font-medium text-ink transition hover:bg-gold-soft"
          >
            <CalendarPlus className="size-4" strokeWidth={1.6} />
            Simpan ke Kalender
          </a>
        </FadeUp>
      </div>
    </section>
  )
}

/** Angka yang bergulir vertikal per digit saat berubah. */
function RollingNumber({ value }: { value: number }) {
  const digits = String(value).padStart(2, '0').split('')
  return (
    <span className="flex justify-center font-serif text-[min(11cqw,44px)] leading-none tabular-nums">
      {digits.map((d, i) => (
        <span key={i} className="relative inline-block h-[1em] w-[0.55em] overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={d}
              className="absolute inset-0 text-center"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              {d}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  )
}

export function Events() {
  return (
    <section id="acara" className="bg-bone px-6 py-24 text-ink">
      <SectionLabel index="02">Rangkaian Acara</SectionLabel>
      <h2 className="mt-6 font-serif text-[min(15cqw,64px)] leading-[0.95] tracking-[-0.03em]">
        <SplitText text="Hari yang" className="block" />
        <SplitText text="kami nantikan" className="block italic" delay={0.1} />
      </h2>

      <div className="mt-12 space-y-4">
        {wedding.events.map((e, i) => (
          <EventCard key={e.title} event={e} index={i} />
        ))}
      </div>

      {/* Catatan iOS Safari: URL embed dipakai langsung (bukan maps?output=embed yang di-redirect
          dengan X-Frame-Options), iframe di dalam kontainer scroll (main) tidak dimuat kalau
          pakai loading="lazy", dan CSS filter pada iframe lintas-domain bisa membuatnya kosong.
          Jadi iframe dimuat langsung, tanpa filter, dan sudut membulat dipotong lewat lapisan
          sendiri (isolate) supaya WebKit tetap menggambar isinya. */}
      <FadeUp className="mt-4">
        <div className="isolate overflow-hidden rounded-[28px] border border-ink/10 bg-bone [transform:translateZ(0)]">
          <iframe
            title="Peta lokasi resepsi"
            src={wedding.mapsEmbed}
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-56 w-full border-0"
          />
          <a
            href={wedding.events[1].maps}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between border-t border-ink/10 px-5 py-3.5 text-[12px] font-medium tracking-wide text-ink"
          >
            Buka di Google Maps
            <ArrowUpRight className="size-4" strokeWidth={1.6} />
          </a>
        </div>
      </FadeUp>
    </section>
  )
}

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  return (
    <motion.article
      className="relative overflow-hidden rounded-[28px] bg-paper p-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: EASE, delay: index * 0.1 }}
    >
      <span className="absolute -top-4 -right-1 font-serif text-[120px] leading-none text-ink/[0.05] italic tabular-nums">
        0{index + 1}
      </span>

      <p className="eyebrow text-gold">{event.date}</p>
      <h3 className="mt-3 font-serif text-[44px] leading-none tracking-[-0.02em]">{event.title}</h3>

      <div className="mt-6 space-y-3 text-[13px]">
        <p className="flex items-center gap-3">
          <Clock className="size-4 shrink-0 text-stone" strokeWidth={1.5} />
          {event.time}
        </p>
        <p className="flex gap-3">
          <MapPin className="mt-0.5 size-4 shrink-0 text-stone" strokeWidth={1.5} />
          <span>
            <span className="block font-medium">{event.venue}</span>
            <span className="text-stone">{event.address}</span>
          </span>
        </p>
      </div>

      <div className="mt-6 flex gap-2">
        <a
          href={event.maps}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-1 items-center justify-between rounded-full bg-ink py-1.5 pr-1.5 pl-4 text-[12px] text-paper"
        >
          Lihat Lokasi
          <span className="grid size-8 place-items-center rounded-full bg-paper/10 transition group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </a>
        <a
          href={calendarUrl(event)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Simpan ${event.title} ke kalender`}
          className="grid size-11 place-items-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-paper"
        >
          <CalendarPlus className="size-4" strokeWidth={1.6} />
        </a>
      </div>
    </motion.article>
  )
}

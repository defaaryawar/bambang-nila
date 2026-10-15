import { motion } from 'framer-motion'
import { BookHeart, CalendarHeart, Gift, House, Mail, Users } from 'lucide-react'
import { useEffect, useState, type RefObject } from 'react'
import { EASE } from './ui/ease'

const ITEMS = [
  { id: 'home', label: 'Beranda', icon: House },
  { id: 'mempelai', label: 'Mempelai', icon: Users },
  { id: 'acara', label: 'Acara', icon: CalendarHeart },
  { id: 'kisah', label: 'Kisah', icon: BookHeart },
  { id: 'surat', label: 'Surat', icon: Mail },
  { id: 'hadiah', label: 'Hadiah', icon: Gift },
]

/** Navigasi melayang di bawah, menandai section yang sedang dilihat. */
export function Dock({ scroller }: { scroller: RefObject<HTMLElement | null> }) {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const root = scroller.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { root, rootMargin: '-45% 0px -50% 0px' },
    )
    ITEMS.forEach(({ id }) => {
      const el = root.querySelector(`#${id}`)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [scroller])

  const go = (id: string) => {
    scroller.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.nav
      className="pointer-events-none absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+14px)] z-20 flex justify-center"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 1.6 }}
    >
      <ul className="pointer-events-auto flex gap-0.5 rounded-full border border-paper/10 bg-ink/75 p-1.5 shadow-[0_12px_40px_rgba(20,18,15,0.35)] backdrop-blur-xl">
        {ITEMS.map(({ id, label, icon: Icon }) => {
          const on = active === id
          return (
            <li key={id}>
              <button
                onClick={() => go(id)}
                aria-label={label}
                aria-current={on ? 'true' : undefined}
                className={`relative grid size-10 place-items-center rounded-full transition-colors ${on ? 'text-ink' : 'text-paper/60 hover:text-paper'}`}
              >
                {on && (
                  <motion.span
                    layoutId="dock-active"
                    className="absolute inset-0 rounded-full bg-paper"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon className="relative size-[18px]" strokeWidth={1.6} />
              </button>
            </li>
          )
        })}
      </ul>
    </motion.nav>
  )
}

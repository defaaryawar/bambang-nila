import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { Cover } from './components/Cover'
import { Curtain } from './components/Curtain'
import { DesktopAside } from './components/DesktopAside'
import { Dock } from './components/Dock'
import { MusicPlayer } from './components/MusicPlayer'
import { Couple } from './components/sections/Couple'
import { Closing, Footer } from './components/sections/Closing'
import { Events, SaveTheDate } from './components/sections/Events'
import { Gift } from './components/sections/Gift'
import { Hero } from './components/sections/Hero'
import { Invited } from './components/sections/Invited'
import { Marquee, Quote } from './components/sections/Intro'
import { Letter, Promises } from './components/sections/Letter'
import { Story } from './components/sections/Story'
import { photo, wedding } from './data/wedding'
import { useAudioPlayer } from './hooks/useAudioPlayer'

/**
 * Nama tamu opsional dari URL, contoh: /?to=Nama+Tamu
 * Tanpa parameter, undangan tampil general (tanpa nama).
 */
function useGuestName() {
  return useMemo(() => {
    const to = new URLSearchParams(window.location.search).get('to')?.trim()
    return to ? to.slice(0, 60) : null
  }, [])
}

export default function App() {
  const guest = useGuestName()
  const player = useAudioPlayer(wedding.playlist)
  const scroller = useRef<HTMLElement>(null)

  const [curtainGone, setCurtainGone] = useState(false)
  const [curtainOpening, setCurtainOpening] = useState(false)
  const [opened, setOpened] = useState(false)

  const openInvitation = () => {
    // play() dipanggil langsung di handler klik agar lolos autoplay policy mobile
    player.play()
    setOpened(true)
    scroller.current?.scrollTo({ top: 0 })
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-dvh w-full overflow-hidden bg-paper">
        <DesktopAside play={curtainOpening} />

        {/* Kolom "layar HP": full di mobile, 430px di kanan pada desktop */}
        <div className="@container relative h-dvh w-full shrink-0 overflow-hidden bg-paper md:w-[430px] md:border-l md:border-paper/10 md:shadow-[-30px_0_80px_rgba(20,18,15,0.45)]">
          <main
            ref={scroller}
            className={`no-scrollbar h-full overflow-x-hidden overscroll-contain ${opened ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
          >
            <Hero scroller={scroller} play={opened} />
            <Marquee />
            <Quote />
            <Couple />
            <SaveTheDate scroller={scroller} />
            <Events />
            <Story scroller={scroller} />
            <Marquee />
            <Letter />
            <Promises />
            <Gift />
            <Invited />
            <Closing scroller={scroller} />
            <Footer />
          </main>

          {opened && <MusicPlayer player={player} />}
          {opened && <Dock scroller={scroller} />}

          <AnimatePresence>
            {!opened && <Cover key="cover" guest={guest} play={curtainOpening} onOpen={openInvitation} />}
          </AnimatePresence>
        </div>

        {!curtainGone && (
          <Curtain
            preload={[photo(wedding.photos.cover, 1000), photo(wedding.photos.aside, 2000)]}
            onOpenStart={() => setCurtainOpening(true)}
            onDone={() => setCurtainGone(true)}
          />
        )}
      </div>
    </MotionConfig>
  )
}

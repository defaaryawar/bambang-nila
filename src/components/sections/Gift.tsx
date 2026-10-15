import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Gift as GiftIcon } from 'lucide-react'
import { useState } from 'react'
import { wedding } from '../../data/wedding'
import { EASE } from '../ui/ease'
import { FadeUp, SectionLabel, SplitText } from '../ui/motion'

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // Fallback untuk browser lama / non-HTTPS
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
}

function CopyButton({ text, label, dark }: { text: string; label: string; dark?: boolean }) {
  const [done, setDone] = useState(false)
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={async () => {
        await copyText(text)
        setDone(true)
        setTimeout(() => setDone(false), 1800)
      }}
      className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-[12px] transition ${
        dark ? 'bg-paper text-ink' : 'bg-ink text-paper'
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={done ? 'done' : 'idle'}
          className="flex items-center gap-2"
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {done ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {done ? 'Tersalin' : label}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

export function Gift() {
  return (
    <section id="hadiah" className="relative overflow-hidden bg-bone px-6 py-24 text-ink">
      <SectionLabel index="06">
        Wedding Gift
      </SectionLabel>
      <h2 className="mt-6 font-serif text-[min(15cqw,64px)] leading-[0.95] tracking-[-0.03em]">
        <SplitText text="Tanda" className="block" />
        <SplitText text="kasih" className="block italic" delay={0.1} />
      </h2>
      <FadeUp>
        <p className="mt-5 max-w-[34ch] text-[13px] leading-relaxed text-stone">
          Kehadiran dan doa restu Anda sudah lebih dari cukup bagi kami. Namun bila ingin mengirimkan tanda kasih, dapat
          dikirimkan ke alamat berikut.
        </p>
      </FadeUp>

      <FadeUp className="mt-10 rounded-[22px] border border-ink/10 bg-paper p-5">
        <div className="flex items-center gap-2 text-gold">
          <GiftIcon className="size-4" strokeWidth={1.5} />
          <span className="eyebrow">Kirim Hadiah</span>
        </div>
        <p className="mt-3 text-[13px] font-medium">{wedding.giftAddress.name}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-stone">{wedding.giftAddress.address}</p>
        <div className="mt-4">
          <CopyButton text={`${wedding.giftAddress.name} — ${wedding.giftAddress.address}`} label="Salin Alamat" />
        </div>
      </FadeUp>
    </section>
  )
}

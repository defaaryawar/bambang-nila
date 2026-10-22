import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, CreditCard, Gift as GiftIcon } from 'lucide-react'
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
      <SectionLabel index="07">
        Wedding Gift
      </SectionLabel>
      <h2 className="mt-6 font-serif text-[min(15cqw,64px)] leading-[0.95] tracking-[-0.03em]">
        <SplitText text="Tanda" className="block" />
        <SplitText text="kasih" className="block italic" delay={0.1} />
      </h2>
      <FadeUp>
        <p className="mt-5 max-w-[34ch] text-[13px] leading-relaxed text-stone">
          Kehadiran dan doa restu Anda sudah lebih dari cukup bagi kami. Namun bila ingin mengirimkan tanda kasih, dapat
          dikirimkan melalui rekening atau alamat berikut.
        </p>
      </FadeUp>

      <div className="mt-10 space-y-3">
        {wedding.banks.map((b, i) => (
          <FadeUp key={b.bank} delay={0.08 * i} className="rounded-[22px] bg-ink p-5 text-paper">
            <div className="flex items-center justify-between">
              <span className="font-serif text-[26px] leading-none tracking-[0.02em]">{b.bank}</span>
              <CreditCard className="size-5 text-gold-soft" strokeWidth={1.4} />
            </div>
            <p className="mt-6 font-mono text-[19px] tracking-[0.12em] tabular-nums">
              {b.number.replace(/(\d{4})(?=\d)/g, '$1 ')}
            </p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="eyebrow text-[9px] text-paper/50">Atas nama</p>
                <p className="mt-1 text-[13px]">{b.name}</p>
              </div>
              <CopyButton text={b.number} label="Salin" dark />
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-3 rounded-[22px] border border-ink/10 bg-paper p-5">
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

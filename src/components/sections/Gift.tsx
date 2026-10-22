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

/** Chip kartu emas tipis */
function Chip() {
  return (
    <span className="relative block h-7 w-9 overflow-hidden rounded-[6px] bg-gradient-to-br from-[#ead9b0] via-[#c9a96a] to-[#a8864c]">
      <span className="absolute inset-x-0 top-1/2 h-px bg-black/20" />
      <span className="absolute inset-y-0 left-1/3 w-px bg-black/20" />
      <span className="absolute inset-y-0 right-1/3 w-px bg-black/20" />
    </span>
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
          <FadeUp key={b.bank} delay={0.08 * i}>
            {/* Kartu bergaya kartu debit: logo resmi bank di atas putih, pita warna bank di bawah */}
            <div className="relative overflow-hidden rounded-[22px] border border-ink/10 bg-white shadow-[0_18px_40px_-24px_rgba(28,26,23,0.45)]">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full opacity-[0.13] blur-2xl"
                style={{ background: b.color }}
              />
              <div className="relative px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <img src={b.logo} alt={b.bank} className="h-7 w-auto" />
                  <Chip />
                </div>
                <p className="mt-7 font-mono text-[19px] tracking-[0.12em] text-ink tabular-nums">
                  {b.number.replace(/(\d{4})(?=\d)/g, '$1 ')}
                </p>
              </div>
              <div
                className="relative flex items-end justify-between gap-3 px-5 py-4 text-white"
                style={{ background: `linear-gradient(110deg, ${b.deep}, ${b.color})` }}
              >
                <div>
                  <p className="eyebrow text-[9px] text-white/70">Atas nama</p>
                  <p className="mt-1 text-[13px] font-medium">{b.name}</p>
                </div>
                <CopyButton text={b.number} label="Salin" dark />
              </div>
              {/* kilau yang lewat sekali saat kartu muncul */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                initial={{ x: '0%' }}
                whileInView={{ x: '400%' }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.5 + 0.15 * i }}
              />
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

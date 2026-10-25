import { useEffect, useMemo, useState } from 'react'
import { wedding } from '../data/wedding'

// Halaman admin di /admin: isi nama tamu, lalu salin pesan atau kirim via WhatsApp.

const TEMPLATE_KEY = 'admin-template'

const DEFAULT_TEMPLATE = `Kepada Yth.
Bapak/Ibu/Saudara/i
*{nama}*

Assalamu'alaikum Warahmatullahi Wabarakatuh

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

*${wedding.bride.nick} & ${wedding.groom.nick}*
${wedding.dateLabel}

Info lengkap acara bisa dilihat melalui link undangan berikut:
{link}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Mohon maaf perihal undangan hanya dibagikan melalui pesan ini.

Wassalamu'alaikum Warahmatullahi Wabarakatuh

Kami yang berbahagia,
${wedding.bride.nick} & ${wedding.groom.nick}`

/** Nomor WA ke format internasional tanpa "+", contoh 0812... → 62812... */
const normalizePhone = (raw: string) => {
  const digits = raw.replace(/\D/g, '')
  if (digits.startsWith('0')) return `62${digits.slice(1)}`
  if (digits.startsWith('8')) return `62${digits}`
  return digits
}

const readTemplate = () => {
  try {
    return localStorage.getItem(TEMPLATE_KEY) ?? DEFAULT_TEMPLATE
  } catch {
    return DEFAULT_TEMPLATE
  }
}

export function Admin() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [template, setTemplate] = useState(readTemplate)
  const [editing, setEditing] = useState(false)
  const [copied, setCopied] = useState<'pesan' | 'link' | null>(null)

  useEffect(() => {
    document.title = `Admin · ${wedding.bride.nick} & ${wedding.groom.nick}`
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(TEMPLATE_KEY, template)
    } catch {
      // Penyimpanan tidak tersedia; template tetap dipakai selama halaman terbuka
    }
  }, [template])

  const guest = name.trim()
  const link = useMemo(() => {
    const url = new URL('/', window.location.origin)
    if (guest) url.searchParams.set('to', guest)
    return url.toString()
  }, [guest])
  const message = template.replaceAll('{nama}', guest || 'Bapak/Ibu/Saudara/i').replaceAll('{link}', link)
  const waNumber = normalizePhone(phone)
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`

  const copy = async (text: string, what: 'pesan' | 'link') => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback untuk browser tanpa izin clipboard
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      el.remove()
    }
    setCopied(what)
    setTimeout(() => setCopied(null), 1800)
  }

  return (
    <div className="h-full overflow-y-auto bg-bone">
      <main className="mx-auto max-w-lg px-5 pt-10 pb-6">
        <p className="eyebrow text-stone">Admin Undangan</p>
        <h1 className="mt-2 font-serif text-[40px] leading-none">
          {wedding.bride.nick} <span className="text-gold">&</span> {wedding.groom.nick}
        </h1>
        <p className="mt-3 text-sm text-stone">Isi nama tamu, lalu salin pesannya atau kirim langsung via WhatsApp.</p>

        <section className="mt-8 space-y-4 rounded-2xl bg-paper p-5 shadow-sm">
          <label className="block">
            <span className="text-xs font-medium text-stone">Nama tamu</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              placeholder="contoh: Pak Budi & Keluarga"
              className="mt-1.5 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-[15px] outline-none focus:border-gold"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-stone">Nomor WhatsApp (opsional)</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              placeholder="0812xxxxxxx"
              className="mt-1.5 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-[15px] outline-none focus:border-gold"
            />
            <span className="mt-1 block text-[11px] text-stone">Kosongkan untuk memilih kontak sendiri di WhatsApp.</span>
          </label>

          <div>
            <span className="text-xs font-medium text-stone">Link undangan</span>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl bg-bone px-4 py-3">
              <span className="min-w-0 flex-1 truncate text-[13px]">{link}</span>
              <button onClick={() => copy(link, 'link')} className="shrink-0 text-xs font-medium text-gold">
                {copied === 'link' ? 'Tersalin ✓' : 'Salin'}
              </button>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-2xl bg-paper p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone">{editing ? 'Edit template' : 'Pratinjau pesan'}</span>
            <div className="flex gap-3 text-xs font-medium text-gold">
              {editing && template !== DEFAULT_TEMPLATE && (
                <button onClick={() => setTemplate(DEFAULT_TEMPLATE)}>Reset</button>
              )}
              <button onClick={() => setEditing((v) => !v)}>{editing ? 'Selesai' : 'Edit template'}</button>
            </div>
          </div>
          {editing ? (
            <>
              <textarea
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                rows={16}
                className="mt-3 w-full rounded-xl border border-ink/10 bg-white p-4 text-[13px] leading-relaxed outline-none focus:border-gold"
              />
              <p className="mt-1 text-[11px] text-stone">
                Pakai <code>{'{nama}'}</code> untuk nama tamu dan <code>{'{link}'}</code> untuk link undangan.
              </p>
            </>
          ) : (
            <p className="mt-3 rounded-xl bg-bone p-4 text-[13px] leading-relaxed break-words whitespace-pre-wrap">{message}</p>
          )}
        </section>

        <div className="sticky bottom-0 -mx-5 mt-6 grid grid-cols-2 gap-3 bg-bone/95 px-5 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)] backdrop-blur">
          <button
            onClick={() => copy(message, 'pesan')}
            disabled={!guest}
            className="rounded-full border border-ink/15 bg-paper py-3.5 text-sm font-medium disabled:opacity-40"
          >
            {copied === 'pesan' ? 'Tersalin ✓' : 'Salin Pesan'}
          </button>
          <a
            href={guest ? waUrl : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!guest}
            className="rounded-full bg-[#25d366] py-3.5 text-center text-sm font-medium text-white aria-disabled:pointer-events-none aria-disabled:opacity-40"
          >
            Kirim via WA
          </a>
        </div>
        {!guest && <p className="mt-1 text-center text-[11px] text-stone">Isi nama tamu dulu untuk mengirim.</p>}
      </main>
    </div>
  )
}

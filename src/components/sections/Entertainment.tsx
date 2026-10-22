import { Expand } from 'lucide-react'
import { wedding } from '../../data/wedding'
import { FadeUp, ImageReveal, SectionLabel, SplitText } from '../ui/motion'

export function Entertainment() {
  const { banner, acts } = wedding.entertainment
  return (
    <section id="hiburan" className="grain relative overflow-hidden bg-ink px-6 py-24 text-paper">
      <SectionLabel index="03" light>
        Hiburan
      </SectionLabel>
      <h2 className="mt-6 font-serif text-[min(15cqw,64px)] leading-[0.95] tracking-[-0.03em]">
        <SplitText text="Meriahkan" className="block" />
        <SplitText text="bersama kami" className="block italic" delay={0.1} />
      </h2>
      <FadeUp>
        <p className="mt-5 max-w-[34ch] text-[13px] leading-relaxed text-paper/60">
          Selain akad dan resepsi, kami juga menghadirkan hiburan sepanjang hari untuk Bapak/Ibu/Saudara/i sekalian.
        </p>
      </FadeUp>

      <ol className="mt-10 border-t border-paper/15">
        {acts.map((a, i) => (
          <FadeUp key={a.title} delay={0.08 * i}>
            <li className="flex items-baseline gap-4 border-b border-paper/15 py-5">
              <span className="w-6 shrink-0 font-serif text-[15px] text-gold-soft italic tabular-nums">0{i + 1}</span>
              <div className="min-w-0">
                <p className="eyebrow text-[9px] text-paper/50 tabular-nums">{a.time}</p>
                <h3 className="mt-2 font-serif text-[30px] leading-none">{a.title}</h3>
                <p className="mt-1.5 text-[13px] text-paper/70">{a.by}</p>
              </div>
            </li>
          </FadeUp>
        ))}
      </ol>

      {/* Banner dari keluarga; ketuk untuk membuka ukuran penuh */}
      <a href={banner} target="_blank" rel="noreferrer" className="group relative mt-10 block">
        <ImageReveal
          src={banner}
          alt="Banner hiburan pernikahan: Reog Ponorogo Roso Jati dan AS Campursari"
          className="aspect-[678/1012] overflow-hidden rounded-[22px]"
          imgClassName="!object-contain"
          from="bottom"
        />
        <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-ink/70 text-paper backdrop-blur-md">
          <Expand className="size-4" strokeWidth={1.6} />
        </span>
      </a>
    </section>
  )
}

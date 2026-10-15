import { useCallback, useEffect, useRef, useState } from 'react'
import type { Track } from '../data/wedding'

export type AudioPlayer = ReturnType<typeof useAudioPlayer>

export function useAudioPlayer(playlist: Track[]) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const indexRef = useRef(0)

  /** Elemen audio dibuat sekali, hanya diakses dari effect & event handler. */
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio()
      a.preload = 'none'
      a.src = playlist[0].src
      audioRef.current = a
    }
    return audioRef.current
  }, [playlist])

  const load = useCallback(
    (i: number, autoplay: boolean) => {
      const a = getAudio()
      indexRef.current = i
      a.src = playlist[i].src
      setIndex(i)
      setTime(0)
      setDuration(0)
      // play() dipanggil di stack yang sama dengan gesture (klik) supaya diizinkan iOS
      if (autoplay) a.play().catch(() => setPlaying(false))
    },
    [getAudio, playlist],
  )

  useEffect(() => {
    const a = getAudio()
    let resumeOnVisible = false
    const onTime = () => setTime(a.currentTime)
    const onMeta = () => setDuration(a.duration || 0)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => load((indexRef.current + 1) % playlist.length, true)

    // Pause saat tab/app disembunyikan (penting di iOS/Android), lanjut lagi saat kembali
    const onVisibility = () => {
      if (document.hidden) {
        resumeOnVisible = !a.paused
        a.pause()
      } else if (resumeOnVisible) {
        a.play().catch(() => {})
      }
    }

    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('durationchange', onMeta)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    a.addEventListener('ended', onEnded)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('durationchange', onMeta)
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('ended', onEnded)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [getAudio, load, playlist.length])

  /** Harus dipanggil langsung dari event klik supaya lolos autoplay policy iOS/Android. */
  const play = useCallback(() => {
    getAudio()
      .play()
      .catch(() => setPlaying(false))
  }, [getAudio])

  const toggle = useCallback(() => {
    const a = getAudio()
    if (a.paused) play()
    else a.pause()
  }, [getAudio, play])

  const select = useCallback(
    (i: number) => (i === indexRef.current ? toggle() : load(i, true)),
    [load, toggle],
  )
  const next = useCallback(() => load((indexRef.current + 1) % playlist.length, true), [load, playlist.length])
  const prev = useCallback(() => {
    const a = getAudio()
    if (a.currentTime > 4) a.currentTime = 0
    else load((indexRef.current - 1 + playlist.length) % playlist.length, true)
  }, [getAudio, load, playlist.length])

  const seek = useCallback(
    (ratio: number) => {
      const a = getAudio()
      if (a.duration) a.currentTime = ratio * a.duration
    },
    [getAudio],
  )

  return { track: playlist[index], index, playing, time, duration, play, toggle, next, prev, select, seek }
}

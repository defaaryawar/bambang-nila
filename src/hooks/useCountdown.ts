import { useEffect, useState } from 'react'

const split = (target: number) => {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    done: diff === 0,
  }
}

export function useCountdown(iso: string) {
  const target = new Date(iso).getTime()
  const [left, setLeft] = useState(() => split(target))

  useEffect(() => {
    const id = setInterval(() => setLeft(split(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return left
}

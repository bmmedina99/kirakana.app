import { useCallback, useEffect, useRef, useState } from 'react'

type AudioPlayerState = {
  error: string | null
  playingId: string | null
  play: (source: string, id: string) => void
  stop: () => void
}

export function useAudioPlayer(): AudioPlayerState {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const stopCurrentAudio = useCallback(() => {
    audioRef.current?.pause()
    audioRef.current = null
    setPlayingId(null)
    setError(null)
  }, [])

  const play = useCallback(
    (source: string, id: string) => {
      stopCurrentAudio()

      const audio = new Audio(source)
      audioRef.current = audio
      setError(null)
      setPlayingId(id)

      const finish = () => {
        if (audioRef.current !== audio) return

        audioRef.current = null
        setPlayingId(null)
      }

      audio.addEventListener('ended', finish, { once: true })
      audio.addEventListener(
        'error',
        () => {
          if (audioRef.current !== audio) return

          finish()
          setError('Audio pendiente de incorporar.')
        },
        { once: true },
      )

      void audio.play().catch(() => {
        if (audioRef.current !== audio) return

        finish()
        setError('No se ha podido reproducir el audio.')
      })
    },
    [stopCurrentAudio],
  )

  useEffect(() => stopCurrentAudio, [stopCurrentAudio])

  return { error, playingId, play, stop: stopCurrentAudio }
}

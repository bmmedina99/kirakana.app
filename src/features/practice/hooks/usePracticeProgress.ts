import { useCallback, useEffect, useRef, useState } from 'react'
import {
  createPracticeRecorder,
  type PracticeRecorder,
  type PracticeStorageNotice,
  recoverInterruptedPractice,
} from '@/features/progress/utils/practiceStorage'
import type { SyllabarySlug } from '@/lib/routes'
import type { PracticeFilters } from '../utils/practiceSession'

export function usePracticeProgress(syllabary: SyllabarySlug) {
  const recorderRef = useRef<PracticeRecorder | null>(null)
  const [storageNotice, setStorageNotice] =
    useState<PracticeStorageNotice>(null)

  const abandon = useCallback(() => {
    const recorder = recorderRef.current
    recorderRef.current = null
    if (recorder) void recorder.close()
  }, [])

  const begin = useCallback(
    (filters: PracticeFilters) => {
      abandon()
      setStorageNotice(null)
      const recorder = createPracticeRecorder(syllabary, filters, (notice) => {
        if (recorderRef.current === recorder) setStorageNotice(notice)
      })
      recorderRef.current = recorder
    },
    [abandon, syllabary],
  )

  const recordAnswer = useCallback(
    (index: number, kana: string, isCorrect: boolean) => {
      void recorderRef.current?.answer(index, kana, isCorrect)
    },
    [],
  )

  const retry = useCallback(() => {
    void recorderRef.current?.retry()
  }, [])

  useEffect(() => {
    void recoverInterruptedPractice()
    const leave = () => {
      abandon()
      setStorageNotice({
        message:
          'Esta ronda se ha interrumpido y no guardará más respuestas. Comienza otra sesión para volver a guardar el progreso.',
        canRetry: false,
      })
    }
    window.addEventListener('pagehide', leave)
    return () => {
      window.removeEventListener('pagehide', leave)
      abandon()
    }
  }, [abandon])

  return { begin, abandon, recordAnswer, retry, storageNotice }
}

import { useCallback, useState } from 'react'
import {
  learningStorageMessage,
  recordLearningView,
} from '@/features/progress/utils/storage'
import type { SyllabarySlug } from '@/lib/routes'

export function useLearningProgress(syllabary: SyllabarySlug) {
  const [storageError, setStorageError] = useState<string | null>(null)

  const recordView = useCallback(
    async (kana: string) => {
      const result = await recordLearningView(syllabary, kana)
      setStorageError(result.ok ? null : learningStorageMessage(result.error))
    },
    [syllabary],
  )

  return { recordView, storageError }
}

import { memo } from 'react'
import type {
  KanaGroup,
  KanaGroupCategory,
  KanaGroupSlug,
} from '@/features/data/groups'
import type { LearnAccent } from '../types'

type Props = {
  groups: KanaGroup[]
  activeGroupSlug: KanaGroupSlug
  accent: LearnAccent
  onSelectGroup: (slug: KanaGroupSlug) => void
}

const categoryLabels: Record<KanaGroupCategory, string> = {
  basico: 'Básico',
  modificado: 'Modificado',
  combinaciones: 'Combinaciones y\u014don',
}

const categories: KanaGroupCategory[] = [
  'basico',
  'modificado',
  'combinaciones',
]

function KanaGroupSidebarComponent({
  groups,
  activeGroupSlug,
  accent,
  onSelectGroup,
}: Props) {
  return (
    <nav
      aria-label='Grupos de kana'
      className='space-y-6'
    >
      {categories.map((category) => {
        const categoryGroups = groups.filter(
          (group) => group.category === category,
        )

        if (categoryGroups.length === 0) return null

        return (
          <section
            key={category}
            aria-labelledby={`category-${category}`}
          >
            <h2
              id={`category-${category}`}
              className='mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500'
            >
              {categoryLabels[category]}
            </h2>
            <ul className='space-y-1'>
              {categoryGroups.map((group) => {
                const isActive = group.slug === activeGroupSlug

                return (
                  <li key={group.slug}>
                    <button
                      type='button'
                      onClick={() => onSelectGroup(group.slug)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${accent.focusRing} ${
                        isActive
                          ? `${accent.border} ${accent.softBackground} ${accent.text}`
                          : 'border-transparent text-neutral-700 hover:border-linen-150 hover:bg-white'
                      }`}
                    >
                      <span className='font-medium'>{group.title}</span>
                      <span className='text-xs text-neutral-500'>
                        {group.items.length}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </nav>
  )
}

export const KanaGroupSidebar = memo(KanaGroupSidebarComponent)

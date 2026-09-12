import { memo, useId } from 'react'
import Icon from '@/components/ui/Icon'
import type {
  KanaGroup,
  KanaGroupCategory,
  KanaGroupSlug,
} from '@/features/data/groups'
import type { SyllabaryTheme } from '@/features/data/syllabaries'

type Props = {
  groups: KanaGroup[]
  activeGroupSlug: KanaGroupSlug
  theme: SyllabaryTheme
  onSelectGroup: (slug: KanaGroupSlug) => void
  collapsible?: boolean
}

const categoryLabels: Record<KanaGroupCategory, string> = {
  basico: 'Básico',
  modificado: 'Dakuten y handakuten',
  combinaciones: 'Combinaciones yōon',
}

const categories: KanaGroupCategory[] = [
  'basico',
  'modificado',
  'combinaciones',
]

function KanaGroupSidebarComponent({
  groups,
  activeGroupSlug,
  theme,
  onSelectGroup,
  collapsible = false,
}: Props) {
  const accordionId = useId()

  return (
    <nav
      aria-label='Grupos de kana'
      className={collapsible ? 'space-y-2' : 'space-y-6'}
    >
      {categories.map((category) => {
        const categoryGroups = groups.filter(
          (group) => group.category === category,
        )

        if (categoryGroups.length === 0) return null

        const containsActiveGroup = categoryGroups.some(
          (group) => group.slug === activeGroupSlug,
        )
        const titleId = `${accordionId}-${category}`
        const groupList = (
          <ul className={collapsible ? 'mt-2 space-y-1' : 'space-y-1'}>
            {categoryGroups.map((group) => {
              const isActive = group.slug === activeGroupSlug

              return (
                <li key={group.slug}>
                  <button
                    type='button'
                    onClick={() => onSelectGroup(group.slug)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${theme.focusRing} ${isActive ? `${theme.border} ${theme.softBackground} ${theme.text}` : 'border-transparent hover:border-linen-150 hover:bg-mauve-50'}`}
                  >
                    <span>{group.title}</span>
                    <span className='text-xs text-copper-200'>
                      {group.items.length}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        )

        if (collapsible) {
          return (
            <details
              key={category}
              name={`kana-group-categories-${accordionId}`}
              open={containsActiveGroup}
              className='group rounded-xl'
            >
              <summary
                className={`flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold uppercase tracking-widest outline-none transition hover:bg-mauve-50 focus-visible:ring-2 focus-visible:ring-offset-2 ${theme.focusRing}`}
              >
                <span>{categoryLabels[category]}</span>
                <Icon
                  name='menu-expand'
                  className='size-5'
                />
              </summary>
              {groupList}
            </details>
          )
        }

        return (
          <section
            key={category}
            aria-labelledby={titleId}
          >
            <h2
              id={titleId}
              className='mb-2 text-xs font-semibold tracking-widest uppercase text-copper-200'
            >
              {categoryLabels[category]}
            </h2>
            {groupList}
          </section>
        )
      })}
    </nav>
  )
}

export const KanaGroupSidebar = memo(KanaGroupSidebarComponent)

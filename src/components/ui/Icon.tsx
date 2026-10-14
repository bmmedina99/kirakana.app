interface Props {
  name: string
  width?: number
  height?: number
  className?: string
}

export default function Icon({
  name,
  width = 24,
  height = 24,
  className,
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      aria-hidden='true'
      className={className}
    >
      <use href={`/assets/svg/sprites.svg#${name}`} />
    </svg>
  )
}

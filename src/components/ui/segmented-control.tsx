import { cn } from '@/utils/cn'

type Option = {
  label: string
  value: string
}

type SegmentedControlProps = {
  value: string
  onChange: (value: string) => void
  options: Option[]
}

export const SegmentedControl = ({
  value,
  onChange,
  options,
}: SegmentedControlProps) => (
  <div className="inline-flex rounded-xl bg-[#ece9e7] p-1">
    {options.map((option) => (
      <button
        key={option.value}
        className={cn(
          'rounded-lg px-8 py-2 text-xs font-semibold uppercase transition',
          option.value === value
            ? 'bg-white text-brand-navy shadow-sm'
            : 'text-[#5b6171]',
        )}
        onClick={() => onChange(option.value)}
        type="button"
      >
        {option.label}
      </button>
    ))}
  </div>
)

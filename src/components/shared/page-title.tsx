import type { ReactNode } from 'react'

type PageTitleProps = {
  title: string
  eyebrow?: string
  description?: string
  action?: ReactNode
}

export const PageTitle = ({
  title,
  eyebrow,
  description,
  action,
}: PageTitleProps) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div className="max-w-3xl">
      {eyebrow ? <div className="section-kicker mb-3">{eyebrow}</div> : null}
      <h1 className="text-[32px] font-extrabold leading-tight tracking-[-0.03em] text-brand-ink md:text-[48px]">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 text-lg text-brand-body">{description}</p>
      ) : null}
    </div>
    {action}
  </div>
)

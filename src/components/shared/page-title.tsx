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
  <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
    <div className="max-w-4xl">
      {eyebrow ? <div className="section-kicker mb-3">{eyebrow}</div> : null}
      <h1 className="text-[34px] font-extrabold leading-[0.96] tracking-[-0.04em] text-brand-ink md:text-[48px] xl:text-[54px]">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-[860px] text-lg leading-8 text-brand-body xl:text-[19px]">
          {description}
        </p>
      ) : null}
    </div>
    {action}
  </div>
)

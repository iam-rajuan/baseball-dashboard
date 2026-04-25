import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { resolveAssetUrl } from '@/utils/asset-url'
import { cn } from '@/utils/cn'

type StableImageProps = {
  src?: string | null
  alt: string
  className?: string
  fallbackClassName?: string
  fallback?: ReactNode
}

export const StableImage = ({
  src,
  alt,
  className,
  fallback,
  fallbackClassName,
}: StableImageProps) => {
  const nextSrc = useMemo(() => resolveAssetUrl(src), [src])
  const [visibleSrc, setVisibleSrc] = useState(nextSrc)
  const [isLoadingNext, setIsLoadingNext] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setHasError(false)

    if (!nextSrc) {
      setVisibleSrc('')
      setIsLoadingNext(false)
      return
    }

    if (nextSrc === visibleSrc) {
      setIsLoadingNext(false)
      return
    }

    let cancelled = false
    const image = new Image()
    setIsLoadingNext(Boolean(visibleSrc))

    image.onload = () => {
      if (cancelled) return
      setVisibleSrc(nextSrc)
      setIsLoadingNext(false)
    }
    image.onerror = () => {
      if (cancelled) return
      setHasError(true)
      setIsLoadingNext(false)
    }
    image.src = nextSrc

    return () => {
      cancelled = true
    }
  }, [nextSrc, visibleSrc])

  if (!visibleSrc || hasError) {
    return (
      <div
        aria-label={alt}
        className={cn(
          'flex items-center justify-center bg-[#f2efee] text-[#8d97ab]',
          fallbackClassName,
          className,
        )}
        role="img"
      >
        {fallback}
      </div>
    )
  }

  return (
    <span className={cn('relative block overflow-hidden', className)}>
      <img alt={alt} className="h-full w-full object-cover" src={visibleSrc} />
      {isLoadingNext ? (
        <span className="absolute inset-0 animate-pulse bg-white/20" />
      ) : null}
    </span>
  )
}

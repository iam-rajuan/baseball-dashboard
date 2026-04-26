import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { RichTextEditor } from '@/components/shared/rich-text-editor'
import { SettingsBackButton } from '@/components/settings/settings-back-button'
import { settingsService } from '@/services/settings-service'
import type { SettingsContent } from '@/types/entities'

const contentMap: Record<
  string,
  {
    key: keyof SettingsContent
    pageKey: 'privacy_policy' | 'terms_conditions' | 'about_us'
    title: string
    description: string
  }
> = {
  'privacy-policy': {
    key: 'privacyPolicy',
    pageKey: 'privacy_policy',
    title: 'Privacy Policy',
    description:
      'Create the formatted privacy policy content used by public app and landing page experiences.',
  },
  terms: {
    key: 'terms',
    pageKey: 'terms_conditions',
    title: 'Terms & Conditions',
    description:
      'Manage the public terms and conditions content as clean HTML.',
  },
  about: {
    key: 'aboutUs',
    pageKey: 'about_us',
    title: 'About Us',
    description:
      'Edit the public About Us page content with headings, lists, alignment, and formatted text.',
  },
}

export const ContentEditorPage = () => {
  const queryClient = useQueryClient()
  const { section = 'privacy-policy' } = useParams()
  const config = contentMap[section]
  const [toast, setToast] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
    enabled: Boolean(config),
  })

  const mutation = useMutation({
    mutationFn: (nextValue: string) =>
      settingsService.updateSection(config.pageKey, nextValue),
    onSuccess: async (savedSettings) => {
      queryClient.setQueryData(['settings'], savedSettings)
      await queryClient.invalidateQueries({ queryKey: ['settings'] })
      setToast({ type: 'success', message: `${config.title} saved successfully.` })
    },
    onError: (saveError) => {
      setToast({
        type: 'error',
        message:
          saveError instanceof Error
            ? saveError.message
            : `Could not save ${config.title}.`,
      })
    },
  })

  useEffect(() => {
    if (!toast) {
      return
    }

    const timeout = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timeout)
  }, [toast])

  if (!config) {
    return null
  }

  return (
    <div className="relative space-y-6 px-1">
      <SettingsBackButton />

      {toast ? (
        <div className="fixed right-5 top-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-white/80 bg-white px-4 py-3 text-sm font-medium text-brand-ink shadow-panel">
          {toast.type === 'success' ? (
            <CheckCircle2 className="size-5 text-emerald-600" />
          ) : (
            <AlertCircle className="size-5 text-red-600" />
          )}
          <span>{toast.message}</span>
        </div>
      ) : null}

      {isLoading ? (
        <div className="dashboard-panel flex min-h-[420px] items-center justify-center gap-3 text-brand-body">
          <Loader2 className="size-5 animate-spin" />
          Loading content...
        </div>
      ) : isError ? (
        <div className="dashboard-panel px-7 py-6">
          <div className="flex items-start gap-3 text-red-700">
            <AlertCircle className="mt-1 size-5" />
            <div>
              <div className="font-semibold">Unable to load content</div>
              <div className="mt-1 text-sm">
                {error instanceof Error ? error.message : 'Please try again.'}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ContentEditorForm
          config={config}
          disabled={mutation.isPending}
          initialContent={data?.[config.key] ?? ''}
          key={`${config.pageKey}-${data?.[config.key] ?? ''}`}
          lastSavedAt={data?.updatedAt ?? null}
          onSave={(nextContent) => mutation.mutate(nextContent)}
        />
      )}
    </div>
  )
}

const sanitizeEditorHtml = (content: string) =>
  DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'b',
      'em',
      'i',
      'u',
      's',
      'span',
      'h1',
      'h2',
      'h3',
      'ul',
      'ol',
      'li',
      'blockquote',
    ],
    ALLOWED_ATTR: ['style'],
  })

const ContentEditorForm = ({
  config,
  disabled,
  initialContent,
  lastSavedAt,
  onSave,
}: {
  config: (typeof contentMap)[string]
  disabled: boolean
  initialContent: string
  lastSavedAt: string | null
  onSave: (content: string) => void
}) => {
  const [content, setContent] = useState(sanitizeEditorHtml(initialContent))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSave(sanitizeEditorHtml(content))
  }

  return (
    <form id="cms-content-form" onSubmit={handleSubmit}>
      <RichTextEditor
        databaseStatus={
          lastSavedAt
            ? `Loaded from database - last saved ${new Intl.DateTimeFormat(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(new Date(lastSavedAt))}`
            : 'Loaded from database - no saved timestamp yet'
        }
        description={config.description}
        disabled={disabled}
        onChange={setContent}
        placeholder={`Write ${config.title.toLowerCase()} content...`}
        title={config.title}
        value={content}
      />
    </form>
  )
}

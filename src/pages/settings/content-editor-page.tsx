import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { RichTextEditor } from '@/components/shared/rich-text-editor'
import { settingsService } from '@/services/settings-service'
import type { SettingsContent } from '@/types/entities'

const contentMap: Record<
  string,
  { key: keyof SettingsContent; title: string }
> = {
  'privacy-policy': { key: 'privacyPolicy', title: 'Privacy Policy' },
  terms: { key: 'terms', title: 'Terms & Conditions' },
  about: { key: 'aboutUs', title: 'About Us' },
}

export const ContentEditorPage = () => {
  const queryClient = useQueryClient()
  const { section = 'privacy-policy' } = useParams()
  const config = contentMap[section]

  const { data } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
  })

  const mutation = useMutation({
    mutationFn: (nextValue: string) =>
      settingsService.updateSection(config.key, nextValue),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })

  if (!config) {
    return null
  }

  return (
    <div className="space-y-6 px-1">
      <RichTextEditor
        defaultValue={data?.[config.key] ?? ''}
        key={`${config.key}-${data?.[config.key] ?? ''}`}
        onBlur={(event) => mutation.mutate(event.currentTarget.value)}
        title={config.title}
      />
    </div>
  )
}

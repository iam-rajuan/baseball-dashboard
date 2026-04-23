import { useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import type { Situation } from '@/types/entities'
import { cn } from '@/utils/cn'

const schema = z.object({
  title: z.string().min(2, 'Enter situation name'),
  image: z.string().min(1, 'Choose a file'),
  displayOrder: z.number().min(0, 'Display order is required'),
  featured: z.boolean(),
})

type SituationFormValues = z.infer<typeof schema>

type SituationFormModalProps = {
  open: boolean
  onClose: () => void
  onSubmit: (values: SituationFormValues) => Promise<unknown>
  initialData?: Situation | null
}

export const SituationFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: SituationFormModalProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SituationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      image: '',
      displayOrder: 0,
      featured: false,
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        title: initialData?.title ?? '',
        image: initialData?.image ?? '',
        displayOrder: initialData?.displayOrder ?? 0,
        featured: initialData?.featured ?? false,
      })
    }
  }, [initialData, open, reset])

  return (
    <Modal
      className="max-w-[560px]"
      footer={
        <div className="flex gap-4">
          <Button
            className="flex-1"
            onClick={onClose}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            type="button"
          >
            Save Situation
          </Button>
        </div>
      }
      onClose={onClose}
      open={open}
      title="Add Situation"
    >
      <div className="space-y-5">
        <Input
          error={errors.title?.message}
          label="Title"
          placeholder="Enter situation name"
          {...register('title')}
        />
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <FileUpload
              helperText={
                errors.image?.message ?? 'Supports JPG, PNG (Max 5 MB)'
              }
              folder="situations/images"
              label="Image Upload Area"
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <Input
          error={errors.displayOrder?.message}
          label="Display Order"
          type="number"
          {...register('displayOrder', { valueAsNumber: true })}
        />
        <p className="-mt-3 text-sm text-brand-body">
          Determines the visual sequence in the app library.
        </p>
        <Controller
          control={control}
          name="featured"
          render={({ field }) => (
            <div className="flex items-start justify-between gap-4 rounded-2xl border border-brand-line bg-[#fcfaf6] px-4 py-4">
              <span>
                <span className="block text-sm font-semibold text-brand-ink">
                  Featured Situation
                </span>
                <span className="mt-1 block text-sm text-brand-body">
                  Prioritize this situation in the main gallery highlights.
                </span>
              </span>
              <Switch
                checked={field.value}
                className={cn(
                  'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition',
                  field.value ? 'bg-brand-orange' : 'bg-[#d8dde8]',
                )}
                onChange={field.onChange}
              >
                <span
                  className={cn(
                    'inline-block size-5 translate-x-1 rounded-full bg-white transition',
                    field.value && 'translate-x-6',
                  )}
                />
              </Switch>
            </div>
          )}
        />
      </div>
    </Modal>
  )
}

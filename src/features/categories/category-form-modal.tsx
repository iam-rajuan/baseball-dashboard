import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { Textarea } from '@/components/ui/textarea'
import type { Category } from '@/types/entities'

const schema = z.object({
  name: z.string().min(2, 'Category name is required'),
  subtitle: z.string().min(2, 'Subtitle is required'),
  cover: z.string().min(1, 'Cover is required'),
  icon: z.string().min(1, 'Icon is required'),
  accessLevel: z.enum(['Free', 'Premium']),
})

type CategoryFormValues = z.infer<typeof schema>

type CategoryFormModalProps = {
  open: boolean
  onClose: () => void
  onSubmit: (values: CategoryFormValues) => Promise<unknown>
  initialData?: Category | null
}

export const CategoryFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: CategoryFormModalProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      subtitle: '',
      cover: '',
      icon: '',
      accessLevel: 'Free',
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        name: initialData?.name ?? '',
        subtitle: initialData?.subtitle ?? '',
        cover: initialData?.cover ?? '',
        icon: initialData?.icon ?? '',
        accessLevel: initialData?.accessLevel ?? 'Free',
      })
    }
  }, [initialData, open, reset])

  return (
    <Modal
      className="max-w-[640px]"
      description="Create a new organizational bucket for your drills."
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
            {initialData ? 'Update Category' : 'Create Category'}
          </Button>
        </div>
      }
      onClose={onClose}
      open={open}
      title={initialData ? 'Edit Category' : 'Add New Category'}
    >
      <div className="space-y-5">
        <Input
          error={errors.name?.message}
          label="Category Name"
          placeholder="e.g. Infield Defense"
          {...register('name')}
        />
        <Textarea
          error={errors.subtitle?.message}
          label="Subtitle"
          placeholder="e.g. Infield Defense"
          rows={3}
          {...register('subtitle')}
        />
        <Controller
          control={control}
          name="cover"
          render={({ field }) => (
            <FileUpload
              helperText={errors.cover?.message ?? 'Recommended size: 800x600'}
              label="Cover Photo"
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="icon"
          render={({ field }) => (
            <FileUpload
              compact
              helperText={errors.icon?.message ?? 'Upload icon'}
              label="Icon Selection"
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="accessLevel"
          render={({ field }) => (
            <div className="space-y-2">
              <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#505666]">
                Access Level
              </span>
              <SegmentedControl
                onChange={field.onChange}
                options={[
                  { label: 'Free', value: 'Free' },
                  { label: 'Premium', value: 'Premium' },
                ]}
                value={field.value}
              />
            </div>
          )}
        />
      </div>
    </Modal>
  )
}

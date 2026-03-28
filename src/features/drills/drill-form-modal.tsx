import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { Category, Drill } from '@/types/entities'

const schema = z.object({
  name: z.string().min(2, 'Drill name is required'),
  categoryId: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description is required'),
  cover: z.string().min(1, 'Cover image is required'),
  accessLevel: z.enum(['Free', 'Premium']),
})

type DrillFormValues = z.infer<typeof schema>

type DrillFormModalProps = {
  open: boolean
  onClose: () => void
  onSubmit: (values: DrillFormValues) => Promise<unknown>
  categories: Category[]
  initialData?: Drill | null
}

export const DrillFormModal = ({
  open,
  onClose,
  onSubmit,
  categories,
  initialData,
}: DrillFormModalProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DrillFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      categoryId: '',
      description: '',
      cover: '',
      accessLevel: 'Free',
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        name: initialData?.name ?? '',
        categoryId: initialData?.categoryId ?? categories[0]?.id ?? '',
        description: initialData?.description ?? '',
        cover: initialData?.cover ?? '',
        accessLevel: initialData?.accessLevel ?? 'Free',
      })
    }
  }, [categories, initialData, open, reset])

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
            {initialData ? 'Update Drill' : 'Save Drill'}
          </Button>
        </div>
      }
      onClose={onClose}
      open={open}
      title={initialData ? 'Edit Drill' : 'Create Drill'}
    >
      <div className="space-y-5">
        <Input
          error={errors.name?.message}
          label="Drill Name"
          placeholder="Enter drill name"
          {...register('name')}
        />
        <Select
          error={errors.categoryId?.message}
          label="Category"
          {...register('categoryId')}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Textarea
          error={errors.description?.message}
          label="Description"
          placeholder="Describe the steps, focus points, and necessary equipment for this drill..."
          {...register('description')}
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

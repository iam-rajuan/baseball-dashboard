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
import { categoryIconOptions } from '@/constants/options'
import type { Category } from '@/types/entities'

const schema = z.object({
  name: z.string().min(2, 'Category name is required'),
  subtitle: z.string().min(2, 'Subtitle is required'),
  cover: z.string().min(1, 'Cover is required'),
  icon: z.string().min(1, 'Icon is required'),
  accentIcon: z.string().min(1, 'Mobile app icon is required'),
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
      accentIcon: 'baseball-outline',
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
        accentIcon: initialData?.accentIcon ?? 'baseball-outline',
        accessLevel: initialData?.accessLevel ?? 'Free',
      })
    }
  }, [initialData, open, reset])

  return (
    <Modal
      className="max-w-[560px]"
      description="Create a drill category with a dashboard image icon and a mobile app category icon."
      footer={
        <div className="flex gap-4">
          <Button
            className="h-12 flex-1 rounded-2xl"
            onClick={onClose}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            className="h-12 flex-1 rounded-2xl"
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
      <div className="space-y-6">
        <Input
          className="h-11 rounded-xl border-0 bg-[#efeced] text-[15px] placeholder:text-[#a6b4c8]"
          error={errors.name?.message}
          label="Category Name"
          placeholder="e.g. Infield Defense"
          {...register('name')}
        />
        <Textarea
          className="min-h-[74px] rounded-xl border-0 bg-[#efeced] text-[15px] placeholder:text-[#a6b4c8]"
          error={errors.subtitle?.message}
          label="Subtitle"
          placeholder="e.g. Infield Defense"
          rows={2}
          {...register('subtitle')}
        />
        <Controller
          control={control}
          name="cover"
          render={({ field }) => (
            <FileUpload
              className="h-[116px] rounded-[16px] border-0 bg-[#efeced]"
              helperText={errors.cover?.message ?? 'Recommended size: 800x600'}
              helperClassName="text-center text-[11px] text-[#9ba9c2]"
              label="Cover Photo"
              folder="categories/covers"
              onChange={field.onChange}
              triggerText="Click to upload or drag and drop"
              value={field.value}
            />
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="icon"
            render={({ field }) => (
              <FileUpload
                className="h-10 flex-row justify-start gap-3 rounded-xl border-0 bg-[#efeced] px-4"
                compact
                helperClassName="hidden"
                helperText={errors.icon?.message ?? 'Upload icon'}
                folder="categories/icons"
                label="Admin Dashboard Icon"
                onChange={field.onChange}
                triggerText="Upload Icon"
                value={field.value}
              />
            )}
          />
          <Select
            className="h-10 rounded-xl border-0 bg-[#efeced] text-[15px]"
            error={errors.accentIcon?.message}
            label="Mobile App Icon"
            {...register('accentIcon')}
          >
            {categoryIconOptions.map((icon) => (
              <option key={icon.value} value={icon.value}>
                {icon.label}
              </option>
            ))}
          </Select>
          <Controller
            control={control}
            name="accessLevel"
            render={({ field }) => (
              <div className="space-y-2">
                <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#505666]">
                  Access Level
                </span>
                <SegmentedControl
                  className="w-full rounded-xl bg-[#ece9e7] p-1"
                  onChange={field.onChange}
                  options={[
                    { label: 'Free', value: 'Free' },
                    { label: 'Premium', value: 'Premium' },
                  ]}
                  optionClassName="flex-1 px-0 py-2"
                  value={field.value}
                />
              </div>
            )}
          />
        </div>
      </div>
    </Modal>
  )
}

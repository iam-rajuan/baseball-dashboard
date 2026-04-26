import { useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { Situation } from '@/types/entities'
import { cn } from '@/utils/cn'

const instructionSchema = z.object({
  player: z.string().min(1, 'Player is required'),
  detail: z.string().min(1, 'Instruction is required'),
})

const schema = z.object({
  title: z.string().min(2, 'Enter situation name'),
  category: z.string().min(1, 'Category is required'),
  shortLabel: z.string().min(1, 'Short label is required').max(4, 'Use 4 characters or less'),
  image: z.string(),
  displayOrder: z.number().min(0, 'Display order is required'),
  featured: z.boolean(),
  diagramVariant: z.enum(['infield', 'outfield']),
  instructions: z.array(instructionSchema),
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
      category: 'Specific Situations',
      shortLabel: '',
      image: '',
      displayOrder: 0,
      featured: false,
      diagramVariant: 'infield',
      instructions: [{ player: 'P', detail: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'instructions',
  })

  useEffect(() => {
    if (open) {
      reset({
        title: initialData?.title ?? '',
        category: initialData?.category ?? 'Specific Situations',
        shortLabel: initialData?.shortLabel ?? '',
        image: initialData?.image ?? '',
        displayOrder: initialData?.displayOrder ?? 0,
        featured: initialData?.featured ?? false,
        diagramVariant: initialData?.diagramVariant ?? 'infield',
        instructions: initialData?.instructions?.length
          ? initialData.instructions
          : [{ player: 'P', detail: '' }],
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
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            error={errors.category?.message}
            label="Category"
            placeholder="Featured Situation"
            {...register('category')}
          />
          <Input
            error={errors.shortLabel?.message}
            label="Short Label"
            placeholder="SS"
            {...register('shortLabel')}
          />
        </div>
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <FileUpload
              helperText={
                errors.image?.message ??
                'Optional. Supports JPG, PNG (Max 5 MB)'
              }
              folder="situations/images"
              label="Image Upload Area"
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="diagramVariant"
          render={({ field }) => (
            <Select
              error={errors.diagramVariant?.message}
              label="Fallback Diagram"
              {...field}
            >
              <option value="infield">Infield</option>
              <option value="outfield">Outfield</option>
            </Select>
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
        <div className="rounded-2xl border border-brand-line bg-[#fcfaf6] px-4 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-brand-ink">
                Player Instructions
              </div>
              <div className="mt-1 text-sm text-brand-body">
                These rows render on the mobile situation detail screen.
              </div>
            </div>
            <Button
              onClick={() => append({ player: '', detail: '' })}
              size="sm"
              type="button"
              variant="secondary"
            >
              <Plus className="mr-2 size-4" />
              Add
            </Button>
          </div>
          <div className="mt-4 space-y-4">
            {fields.map((field, index) => (
              <div
                className="rounded-xl border border-brand-line bg-white p-3"
                key={field.id}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <Input
                    className="max-w-[140px]"
                    error={errors.instructions?.[index]?.player?.message}
                    label="Player"
                    placeholder="P"
                    {...register(`instructions.${index}.player`)}
                  />
                  <button
                    className="mt-8 inline-flex size-9 items-center justify-center rounded-lg text-[#9aa1b1] hover:bg-brand-muted hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                    title="Remove instruction"
                    type="button"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <Textarea
                  error={errors.instructions?.[index]?.detail?.message}
                  label="Instruction"
                  placeholder="Move into backup position..."
                  {...register(`instructions.${index}.detail`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'

const schema = z.object({
  price: z.coerce.number().min(1, 'Price is required'),
})

type PriceManagementModalProps = {
  open: boolean
  onClose: () => void
  price: number
  onSubmit: (price: number) => Promise<unknown>
}

export const PriceManagementModal = ({
  open,
  onClose,
  price,
  onSubmit,
}: PriceManagementModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof schema>, undefined, z.output<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { price },
  })

  useEffect(() => {
    reset({ price })
  }, [price, reset])

  return (
    <Modal
      className="max-w-[520px]"
      footer={
        <div className="flex items-center justify-end gap-4">
          <Button onClick={onClose} type="button" variant="secondary">
            Cancel
          </Button>
          <Button
            disabled={isSubmitting}
            onClick={handleSubmit(({ price: nextPrice }) =>
              onSubmit(nextPrice),
            )}
            type="button"
          >
            Update Price
          </Button>
        </div>
      }
      onClose={onClose}
      open={open}
      title="Edit Price"
    >
      <Input
        error={errors.price?.message}
        label="Full Unlock Price"
        step="0.01"
        type="number"
        {...register('price')}
      />
      <p className="mt-2 text-sm text-brand-body">
        This price will be applied to unlock all premium drills
      </p>
    </Modal>
  )
}

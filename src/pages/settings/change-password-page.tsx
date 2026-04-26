import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SettingsBackButton } from '@/components/settings/settings-back-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { settingsService } from '@/services/settings-service'

const schema = z
  .object({
    currentPassword: z.string().min(8, 'Current password is required'),
    newPassword: z.string().min(8, 'Minimum 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof schema>) =>
      settingsService.changePassword(
        values.currentPassword,
        values.newPassword,
        values.confirmPassword,
      ),
  })

  return (
    <div className="space-y-6 px-1">
      <SettingsBackButton />
      <h1 className="text-[30px] font-medium text-brand-ink">
        Change Password
      </h1>
      <div className="dashboard-panel px-6 py-10">
        <form
          className="mx-auto max-w-[620px] space-y-5"
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
        >
          <Input
            error={errors.currentPassword?.message}
            label="Current Password"
            type="password"
            {...register('currentPassword')}
          />
          <Input
            error={errors.newPassword?.message}
            label="New Password"
            type="password"
            {...register('newPassword')}
          />
          <Input
            error={errors.confirmPassword?.message}
            label="Confirm New Password"
            type="password"
            {...register('confirmPassword')}
          />
          <Button className="w-full" variant="navy">
            Change Password
          </Button>
        </form>
      </div>
    </div>
  )
}

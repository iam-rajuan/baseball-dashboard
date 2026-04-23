import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { authService } from '@/services/auth-service'
import { useAuthStore } from '@/store/auth-store'

const schema = z
  .object({
    newPassword: z.string().min(8, 'Minimum 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const otpEmail = useAuthStore((state) => state.otpEmail)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof schema>) =>
      authService.resetPassword(
        otpEmail,
        values.newPassword,
        values.confirmPassword,
      ),
    onSuccess: () => navigate('/auth/login'),
  })

  return (
    <form
      className="mx-auto max-w-[490px] space-y-6 text-white"
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
    >
      <h1 className="text-[30px] font-bold text-white">Set new password</h1>
      <Input
        className="h-14 rounded-xl border-0"
        error={errors.newPassword?.message}
        label="New Password"
        labelClassName="text-white"
        type="password"
        {...register('newPassword')}
      />
      <Input
        className="h-14 rounded-xl border-0"
        error={errors.confirmPassword?.message}
        label="Confirm New Password"
        labelClassName="text-white"
        type="password"
        {...register('confirmPassword')}
      />
      {mutation.error ? (
        <div className="text-sm text-[#ffc7c2]">{mutation.error.message}</div>
      ) : null}
      <Button className="h-14 rounded-xl" fullWidth size="lg" type="submit">
        Sign Up
      </Button>
    </form>
  )
}

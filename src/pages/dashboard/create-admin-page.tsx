import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { Input } from '@/components/ui/input'
import { adminService } from '@/services/admin-service'

const schema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Minimum 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password'),
    image: z.string().min(1, 'Profile image is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const CreateAdminPage = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: 'jhon doe',
      email: 'abc@gmail.com',
      password: 'password123',
      confirmPassword: 'password123',
      image: '',
    },
  })

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof schema>) =>
      adminService.createAdmin({
        name: values.name,
        email: values.email,
        password: values.password,
        image: values.image,
        contactNo: '+1 222 333 4444',
      }),
    onSuccess: () => reset(),
  })

  return (
    <div className="space-y-6 px-1">
      <h1 className="text-[30px] font-medium text-brand-ink">Create Admin</h1>
      <div className="dashboard-panel px-5 py-5 sm:px-8 sm:py-7">
        <form
          className="space-y-5"
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
        >
          <Input
            error={errors.name?.message}
            label="Name"
            {...register('name')}
          />
          <Input
            error={errors.email?.message}
            label="Email"
            {...register('email')}
          />
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              error={errors.password?.message}
              label="New Password"
              type="password"
              {...register('password')}
            />
            <Input
              error={errors.confirmPassword?.message}
              label="Confirm New Password"
              type="password"
              {...register('confirmPassword')}
            />
          </div>
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <FileUpload
                compact
                helperText={errors.image?.message ?? 'Upload Image'}
                label="Profile Image"
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
          <Button
            className="mx-auto flex w-full max-w-[430px]"
            fullWidth
            variant="navy"
          >
            Create Admin
          </Button>
          {mutation.isSuccess ? (
            <div className="text-center text-sm text-green-600">
              Mock admin created successfully.
            </div>
          ) : null}
        </form>
      </div>
    </div>
  )
}

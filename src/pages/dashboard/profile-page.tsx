import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { adminService } from '@/services/admin-service'
import { useAdminStore } from '@/store/admin-store'

type ProfileForm = {
  name: string
  email: string
  contactNo: string
  image: string
}

export const ProfilePage = () => {
  const setProfile = useAdminStore((state) => state.setProfile)
  const { register, handleSubmit, reset } = useForm<ProfileForm>()

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: adminService.getProfile,
  })

  useEffect(() => {
    if (data) {
      setProfile(data)
      reset({
        name: data.name,
        email: data.email,
        contactNo: data.contactNo,
        image: data.image,
      })
    }
  }, [data, reset, setProfile])

  const mutation = useMutation({
    mutationFn: (values: ProfileForm) => adminService.updateProfile(values),
  })

  return (
    <div className="space-y-6 px-1">
      <h1 className="text-[30px] font-medium text-brand-ink">Profile Setup</h1>
      <div className="dashboard-panel min-h-[720px] px-6 py-8">
        <form
          className="mx-auto max-w-[620px] space-y-6"
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
        >
          <div className="flex flex-col items-center gap-4 pt-6">
            <div className="relative">
              <img
                alt="Admin"
                className="size-24 rounded-full border-2 border-white object-cover shadow-panel"
                src={data?.image}
              />
              <button
                className="absolute bottom-1 right-0 flex size-7 items-center justify-center rounded-full bg-[#e9e9ec] text-[#6b7182]"
                type="button"
              >
                <Pencil className="size-3" />
              </button>
            </div>
            <div className="text-[28px] font-extrabold text-brand-navy">
              {data?.name}
            </div>
            <button
              className="text-sm font-semibold text-brand-navy underline"
              type="button"
            >
              Edit Profile
            </button>
          </div>
          <Input label="User Name" {...register('name')} />
          <Input label="Email" {...register('email')} />
          <Input label="Contact No" {...register('contactNo')} />
          <Button
            className="mx-auto flex w-full max-w-[430px]"
            fullWidth
            variant="navy"
          >
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  )
}

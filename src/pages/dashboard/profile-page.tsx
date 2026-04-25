import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { Input } from '@/components/ui/input'
import { StableImage } from '@/components/ui/stable-image'
import { adminService } from '@/services/admin-service'
import { useAdminStore } from '@/store/admin-store'

type ProfileForm = {
  name: string
  email: string
  contactNo: string
  image: string
}

export const ProfilePage = () => {
  const queryClient = useQueryClient()
  const cachedProfile = useAdminStore((state) => state.profile)
  const setProfile = useAdminStore((state) => state.setProfile)
  const [isEditing, setIsEditing] = useState(false)
  const { register, handleSubmit, reset, setValue, watch, setFocus } =
    useForm<ProfileForm>({
      defaultValues: {
        name: cachedProfile?.name ?? '',
        email: cachedProfile?.email ?? '',
        contactNo: cachedProfile?.contactNo ?? '',
        image: cachedProfile?.image ?? '',
      },
    })
  const image = watch('image')
  const name = watch('name')

  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: adminService.getProfile,
    initialData: cachedProfile ?? undefined,
  })
  const currentProfile = data ?? cachedProfile
  const currentImage = image || currentProfile?.image || ''
  const currentName = name || currentProfile?.name || ''

  useEffect(() => {
    if (data && !isEditing) {
      setProfile(data)
      reset({
        name: data.name,
        email: data.email,
        contactNo: data.contactNo,
        image: data.image,
      })
    }
  }, [data, isEditing, reset, setProfile])

  const mutation = useMutation({
    mutationFn: (values: ProfileForm) => adminService.updateProfile(values),
    onSuccess: async (profile) => {
      setProfile(profile)
      queryClient.setQueryData(['profile'], profile)
      reset({
        name: profile.name,
        email: profile.email,
        contactNo: profile.contactNo,
        image: profile.image,
      })
      setIsEditing(false)
      await queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  const toggleEditing = () => {
    mutation.reset()

    if (isEditing) {
      if (data) {
        reset({
          name: data.name,
          email: data.email,
          contactNo: data.contactNo,
          image: data.image,
        })
      }
      setIsEditing(false)
      return
    }

    setIsEditing(true)
    window.setTimeout(() => setFocus('name'), 0)
  }

  return (
    <div className="space-y-6 px-1">
      <h1 className="text-[30px] font-medium text-brand-ink">Profile Setup</h1>
      <div className="dashboard-panel min-h-[720px] px-6 py-8">
        <form
          className="mx-auto max-w-[620px] space-y-6"
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
        >
          <div className="flex flex-col items-center gap-4 pt-6">
            <StableImage
              alt="Admin"
              className="size-24 rounded-full border-2 border-white shadow-panel"
              fallback={
                isLoading ? (
                  <span className="block size-full animate-pulse rounded-full bg-[#ece9e7]" />
                ) : null
              }
              src={currentImage}
            />
            <div className="text-[28px] font-extrabold text-brand-navy">
              {currentName || (isLoading ? 'Loading...' : '')}
            </div>
            <button
              className="text-sm font-semibold text-brand-navy underline"
              onClick={toggleEditing}
              type="button"
            >
              {isEditing ? 'Discard Changes' : 'Edit Profile'}
            </button>
          </div>
          <FileUpload
            className="mx-auto h-[92px] max-w-[430px]"
            folder="profiles"
            helperText="Supports JPG, PNG (Max 5 MB)"
            label="Profile Photo"
            disabled={!isEditing || mutation.isPending}
            onChange={(value) => setValue('image', value)}
            value={currentImage}
          />
          <Input
            disabled={!isEditing || mutation.isPending}
            label="User Name"
            {...register('name')}
          />
          <Input
            disabled={!isEditing || mutation.isPending}
            label="Email"
            {...register('email')}
          />
          <Input
            disabled={!isEditing || mutation.isPending}
            label="Contact No"
            {...register('contactNo')}
          />
          <Button
            className="mx-auto flex w-full max-w-[430px]"
            disabled={!isEditing || mutation.isPending}
            fullWidth
            variant="navy"
          >
            {mutation.isPending ? 'Updating...' : 'Update Profile'}
          </Button>
          {mutation.isSuccess ? (
            <div className="text-center text-sm text-green-600">
              Profile updated successfully.
            </div>
          ) : null}
          {mutation.error ? (
            <div className="text-center text-sm text-red-500">
              {mutation.error.message}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  )
}

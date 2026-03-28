import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { authService } from '@/services/auth-service'
import { useAuthStore } from '@/store/auth-store'

export const OtpVerificationPage = () => {
  const navigate = useNavigate()
  const otpEmail = useAuthStore((state) => state.otpEmail)
  const [digits, setDigits] = useState(['8', '0', '8', '0'])
  const mutation = useMutation({
    mutationFn: (otp: string) => authService.verifyOtp(otp),
    onSuccess: () => navigate('/auth/reset-password'),
  })

  const otp = digits.join('')

  return (
    <div className="mx-auto max-w-[490px] space-y-8 text-white">
      <div className="space-y-3">
        <h1 className="text-[30px] font-bold text-white">Verify OTP</h1>
        <p className="text-sm leading-7 text-white/70">
          Please check your email. We have sent a code to {otpEmail}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {digits.map((digit, index) => (
          <input
            key={index}
            className="h-16 rounded-2xl border-0 text-center text-2xl font-semibold text-brand-navy outline-none"
            inputMode="numeric"
            maxLength={1}
            onChange={(event) =>
              setDigits((current) =>
                current.map((value, currentIndex) =>
                  currentIndex === index ? event.target.value.slice(-1) : value,
                ),
              )
            }
            value={digit}
          />
        ))}
      </div>
      {mutation.error ? (
        <div className="text-sm text-[#ffc7c2]">{mutation.error.message}</div>
      ) : null}
      <Button
        className="h-14 rounded-xl"
        disabled={otp.length !== 4}
        fullWidth
        onClick={() => mutation.mutate(otp)}
        size="lg"
        type="button"
      >
        Verify Code
      </Button>
      <div className="text-center text-sm text-white/70">
        Didn&apos;t receive code?{' '}
        <button className="text-brand-orange" type="button">
          Resend
        </button>
      </div>
    </div>
  )
}

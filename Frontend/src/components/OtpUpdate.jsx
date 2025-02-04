"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function OTPVerification({ onVerify }) {
  const [otp, setOtp] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onVerify(otp)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="otp" className="text-gray-300">
          Enter OTP
        </Label>
        <Input
          id="otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          maxLength={6}
          className="bg-gray-700 border-gray-600 text-white text-center text-2xl tracking-widest"
        />
      </div>
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Verify OTP
      </Button>
    </form>
  )
}


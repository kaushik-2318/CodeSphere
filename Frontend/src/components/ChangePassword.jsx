"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import OTPVerification from "./OtpUpdate"

export default function ChangePassword() {
    const [showOTP, setShowOTP] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        setShowOTP(true)
    }

    const handleOTPVerification = async (otp) => {
        console.log("OTP:", otp)
        console.log("Password updated successfully")
        setShowOTP(false)
    }

    if (showOTP) {
        return <OTPVerification onVerify={handleOTPVerification} />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="currentPassword" className="text-gray-300">
                    Current Password
                </Label>
                <Input
                    id="currentPassword"
                    type="password"
                    {...register("currentPassword", { required: "Current password is required" })}
                    className="bg-gray-700 border-gray-600 text-white"
                />
                {errors.currentPassword && <p className="text-red-400 text-sm mt-1">{errors.currentPassword.message}</p>}
            </div>
            <div>
                <Label htmlFor="newPassword" className="text-gray-300">
                    New Password
                </Label>
                <Input
                    id="newPassword"
                    type="password"
                    {...register("newPassword", {
                        required: "New password is required",
                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                    })}
                    className="bg-gray-700 border-gray-600 text-white"
                />
                {errors.newPassword && <p className="text-red-400 text-sm mt-1">{errors.newPassword.message}</p>}
            </div>
            <div>
                <Label htmlFor="confirmPassword" className="text-gray-300">
                    Confirm New Password
                </Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                        required: "Please confirm your new password",
                        validate: (value) => value === document.getElementById("newPassword").value || "Passwords do not match",
                    })}
                    className="bg-gray-700 border-gray-600 text-white"
                />
                {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Change Password
            </Button>
        </form>
    )
}


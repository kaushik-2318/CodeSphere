import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import OTPVerification from "./OtpUpdate"

export default function ChangeEmail() {
    const [showOTP, setShowOTP] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        setShowOTP(true)
    }

    const handleOTPVerification = async (otp) => {
        console.log("OTP:", otp)
        console.log("Email updated successfully")
        setShowOTP(false)
    }

    if (showOTP) {
        return <OTPVerification onVerify={handleOTPVerification} />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="currentEmail" className="text-gray-300">
                    Current Email
                </Label>
                <Input
                    id="currentEmail"
                    type="email"
                    {...register("currentEmail", { required: "Current email is required" })}
                    className="bg-gray-700 border-gray-600 text-white"
                />
                {errors.currentEmail && <p className="text-red-400 text-sm mt-1">{errors.currentEmail.message}</p>}
            </div>
            <div>
                <Label htmlFor="newEmail" className="text-gray-300">
                    New Email
                </Label>
                <Input id="newEmail" type="email"{...register("newEmail", { required: "New email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" } })} className="bg-gray-700 border-gray-600 text-white" />
                {errors.newEmail && <p className="text-red-400 text-sm mt-1">{errors.newEmail.message}</p>}
            </div>
            <Button  type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Change Email
            </Button>
        </form>
    )
}


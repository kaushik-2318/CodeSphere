"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ChangePhoneNumber() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        console.log("Phone number updated successfully")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="currentPhoneNumber" className="text-gray-300">
                    Current Phone Number
                </Label>
                <Input
                    id="currentPhoneNumber"
                    type="tel"
                    {...register("currentPhoneNumber", { required: "Current phone number is required" })}
                    className="bg-gray-700 border-gray-600 text-white"
                />
                {errors.currentPhoneNumber && <p className="text-red-400 text-sm mt-1">{errors.currentPhoneNumber.message}</p>}
            </div>
            <div>
                <Label htmlFor="newPhoneNumber" className="text-gray-300">
                    New Phone Number
                </Label>
                <Input
                    id="newPhoneNumber"
                    type="tel"
                    {...register("newPhoneNumber", {
                        required: "New phone number is required",
                        pattern: {
                            value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                            message: "Invalid phone number format",
                        },
                    })}
                    className="bg-gray-700 border-gray-600 text-white"
                />
                {errors.newPhoneNumber && <p className="text-red-400 text-sm mt-1">{errors.newPhoneNumber.message}</p>}
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Change Phone Number
            </Button>
        </form>
    )
}


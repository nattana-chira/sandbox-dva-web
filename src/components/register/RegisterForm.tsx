"use client"

import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../form/Input";
import Label from "../form/Label";
import Link from "next/link";
import { registerUser } from "@/libs/api/auth";
import { handleError } from "@/libs/utils/apiErrorHandler";
import { useRouter } from "next/navigation";
import { FormData } from "./registerForm.interfaces";
import { schema } from "./registerForm.schemas";

export default function RegisterForm() {
  const [loading, setLoading] = useState<boolean>(false)
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>('https://fakeimg.pl/125x125/f2eded/969696?text=Add')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Integrating Yup validation
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const handleOpenInputFile = () => {
    fileInputRef.current?.click()
  }

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmitRegister: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true)
      await registerUser({ ...data, profilePic })
      alert('Register successfully')
      router.push('/login')

    } catch (e: any) {
      handleError(e)

    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitRegister)} className="max-w-md mx-auto p-4 border border-gray-300 rounded text-left shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-1">Register</h2>
      <div className="text-sm font-semibold text-gray-700 opacity-50 text-center mb-5">Create a new account to get started</div>

      {/* Profile Picture Upload */}
      <div className="mb-6 text-center">
        <label className="block text-sm font-semibold mb-2">Profile Image (Optional)</label>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden" />

        {/* Show Image Preview */}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover mb-3 m-auto"
            onClick={handleOpenInputFile}
          />
        )}
        <p className="text-sm" onClick={handleOpenInputFile}>Upload Image</p>
      </div>

      <div className="flex gap-4">
        {/* First Name */}
        <div className="mb-4">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            {...register('firstName')}
          />
        {errors.firstName && <div className="text-red-500 text-sm">{errors.firstName.message}</div>}
      </div>

        {/* Last Name */}
        <div className="mb-4">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            {...register('lastName')}
          />
          {errors.lastName && <div className="text-red-500 text-sm">{errors.lastName.message}</div>}
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="text"
          placeholder="name@example.com"
          {...register('email')}
        />
        {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
      </div>

      {/* Password */}
      <div className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
        />
        {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
      </div>

      {/* Confirm Password */}
      <div className="mb-7">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword.message}</div>}
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button
          type="submit"
          className={`w-full bg-black text-sm text-white p-2 rounded-md h-10 ${loading ? 'bg-gray-400' : ''}`}
          disabled={loading}
        >
          Register
        </button>
      </div>

      <div className="text-center mt-4">
        <p className="text-gray-600 text-sm font-semibold">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </form>
  )
}
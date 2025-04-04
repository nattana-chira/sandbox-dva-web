"use client"

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../form/Input";
import Label from "../form/Label";
import Link from "next/link";
import { schema } from "./loginForm.schemas";
import { FormData } from "./loginForm.interfaces";
import { loginUser } from "@/libs/api/auth";
import { useRouter } from "next/navigation";
import { handleError } from "@/libs/utils/apiErrorHandler";

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
    const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema) // Integrating Yup validation
  })

  const handleSubmitLogin: SubmitHandler<FormData> = async (data) => {
     try {
      setLoading(true)
      const response = await loginUser(data)
      localStorage.setItem("token", response.data.token)
      alert('Login successfully')
      router.push('/')

    } catch (e: any) {
      handleError(e)

    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitLogin)} className="max-w-md mx-auto p-4 border border-gray-300 rounded text-left shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-1">Login</h2>
      <div className="text-sm font-semibold text-gray-700 opacity-50 text-center mb-5">Enter your credentials to access your account</div>

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
      <div className="mb-7">
        <Label htmlFor="password">Email</Label>
         <Input 
          id="password"
          type="password"
          {...register('password')}
        />
        {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button
          type="submit"
          className={`w-full bg-black text-sm text-white p-2 rounded-md h-10 ${loading ? 'bg-gray-400' : ''}`}
          disabled={loading}
        >
          Login
        </button>
      </div>

      <div className="text-center mt-4">
        <p className="text-gray-600 text-sm font-semibold">
          Don't have an account? <Link href="/register">Register</Link>
        </p>
      </div>
    </form>
  )
}
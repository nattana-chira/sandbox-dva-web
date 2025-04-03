"use client"

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import Input from "../form/Input";
import Label from "../form/Label";
import Link from "next/link";

interface FormData {
  email: string
  password: string
}

const schema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
}).required();

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema), // Integrating Yup validation
  })

  const handleSubmitLogin: SubmitHandler<FormData> = (data) => {
    console.log("data", data)
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitLogin)} className="max-w-sm mx-auto p-4 border rounded text-left">
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
          {loading ? 'Login in...' : 'Login'}
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
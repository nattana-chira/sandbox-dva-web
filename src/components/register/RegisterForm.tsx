"use client"

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import Input from "../form/Input";
import Label from "../form/Label";
import Link from "next/link";

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const schema = yup.object({
  firstName: yup
    .string()
    .required('First name is required'),
  lastName: yup
    .string()
    .required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
}).required();

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema), // Integrating Yup validation
  })

  const handleSubmitRegister: SubmitHandler<FormData> = (data) => {
    console.log("data", data)
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitRegister)} className="max-w-sm mx-auto p-4 border rounded text-left">
      <h2 className="text-2xl font-bold text-center mb-1">Register</h2>
      <div className="text-sm font-semibold text-gray-700 opacity-50 text-center mb-5">Create a new account to get started</div>

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
          {loading ? 'Register in...' : 'Register'}
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
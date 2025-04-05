"use client"

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode
}

const AuthGuard = ({ children }: Props) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    
    if (!token) 
      router.push("/login")
    else 
      setIsAuthenticated(true)
    
  }, [router])

  if (!isAuthenticated) 
      return null

  return <>{children}</>
}

export default AuthGuard;
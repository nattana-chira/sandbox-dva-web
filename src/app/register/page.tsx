import RegisterForm from "@/components/register/RegisterForm";
import Link from "next/link"

export default function Register() {
  const handleInputForm = () => {

  }

  const handleInputProfileImage = () => {
    
  }

  const handleRegister = () => {
    
  }

  return (
    <div className="text-center">
      <h1>Register Page</h1>
      <RegisterForm />

      <Link href="/register">register</Link> | 
      <Link href="/login">login</Link> | 
      <Link href="/">home</Link>
    </div>
  );
}
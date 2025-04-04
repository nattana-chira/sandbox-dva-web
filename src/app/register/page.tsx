import RegisterForm from "@/components/register/RegisterForm";
import Link from "next/link"

export default function Register() {
  return (
    <div className="text-center pt-10">
      <RegisterForm />

      <Link href="/register">register</Link> | 
      <Link href="/login">login</Link> | 
      <Link href="/">home</Link>
    </div>
  );
}
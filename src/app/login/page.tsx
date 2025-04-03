import LoginForm from "@/components/login/LoginForm";
import Link from "next/link"

export default function Login() {
  return (
    <div className="text-center">
      <h1>Login Page</h1>
      <LoginForm />

      <Link href="/register">register</Link> | 
      <Link href="/login">login</Link> | 
      <Link href="/">home</Link>
    </div>
  );
}
import Link from "next/link"

export default function Login() {
  const handleInputForm = () => {

  }

  const handleLogIn = () => {
    
  }

  return (
    <div>
      <h1>Login Page</h1>
      <p>This is the about page using the App Router.</p>
      <Link href="/register">register</Link> | 
      <Link href="/login">login</Link> | 
      <Link href="/">home</Link>
    </div>
  );
}
import Link from "next/link"

export default function Register() {
  const handleInputForm = () => {

  }

  const handleInputProfileImage = () => {
    
  }

  const handleRegister = () => {
    
  }

  return (
    <div>
      <h1>Register Page</h1>
      <p>This is the about page using the App Router.</p>
      <Link href="/register">register</Link> | 
      <Link href="/login">login</Link> | 
      <Link href="/">home</Link>
    </div>
  );
}
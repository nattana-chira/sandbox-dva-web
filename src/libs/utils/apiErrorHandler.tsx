export function handleError(e: any) {
  console.error(e)

  const errMsg = e?.response?.data?.error?.message
  const errName = e?.response?.data?.error?.name

  const authExceptions = ["UnauthorizedError", "JsonWebTokenError", "TokenExpiredError"]
  if (authExceptions.includes(errName)) 
    localStorage.removeItem("token")

  alert(`${errName} ${errMsg}`)

  // if (e?.status === 422 || e?.status === 400)
  //   alert(`${errName} ${errMsg}`)
  // else 
  //   alert(`${errName}`)
}
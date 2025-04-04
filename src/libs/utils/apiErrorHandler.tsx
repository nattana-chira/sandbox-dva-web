export function handleError(e: any) {
  const errMsg = e?.response?.data?.error?.message
  const errName = e?.response?.data?.error?.name

  if (e?.status === 422 || e?.status === 400) {
    alert(`${errName} ${errMsg}`)
    
  } else {
    alert(`${errName}`)
  }
  console.error(e)
}
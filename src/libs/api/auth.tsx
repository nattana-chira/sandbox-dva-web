import API from "../utils/api";

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  profileImage?: string
}

type RegisterUserParams = {
  firstName: string
  lastName: string
  email: string
  password: string
  profilePic: File | null
};

type LoginParams = {
  email: string
  password: string
};

type LoginResponse = {
  data: {
    token: string
  }
};

export async function registerUser({ firstName, lastName, email, password, profilePic }: RegisterUserParams) {
  const formData = new FormData();
  formData.append("firstName", firstName)
  formData.append("lastName", lastName)
  formData.append("email", email)
  formData.append("password", password)

  if (profilePic) 
    formData.append("file", profilePic)

  return await API.post("/api/auth/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}

export async function loginUser({ email, password }: LoginParams): Promise<LoginResponse> {
  return await API.post("/api/auth/login", { email, password })
}
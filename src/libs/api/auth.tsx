import axios from "axios";
import { API_URL } from "../constants";

type RegisterUserParams = {
  firstName: string
  lastName: string
  email: string
  password: string
  profilePic: File | null
};

export async function registerUser({ firstName, lastName, email, password, profilePic }: RegisterUserParams) {
  const formData = new FormData();
  formData.append("firstName", firstName)
  formData.append("lastName", lastName)
  formData.append("email", email)
  formData.append("password", password)

  if (profilePic) 
    formData.append("file", profilePic);

  return await axios.post(API_URL + "/api/auth/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}
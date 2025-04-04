import Input from "../form/Input";
import Label from "../form/Label";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddFriendFormData } from "./homePage.interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { addFriendSchema } from "./homePage.schemas";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

type Props = { 
  isOpen: boolean 
  isLoading: boolean
  onClose: () => void
  onAddFriend: SubmitHandler<AddFriendFormData>
}

const Modal = ({ isOpen, isLoading, onClose, onAddFriend }: Props) => {
  const { reset, register, handleSubmit, formState: { errors } } = useForm<AddFriendFormData>({
    resolver: yupResolver(addFriendSchema) // Integrating Yup validation
  })

  useEffect(() => {
    reset()
  }, [isOpen])

  if (!isOpen)
    return null

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg relative w-108">
        <h2 className="font-bold mb-6">Add Friend</h2>

        {/* Close Button */}
        <FontAwesomeIcon
          onClick={onClose}
          icon={faClose}
          className="absolute top-5 right-4 text-gray-600 hover:text-black"
        />

        {/* Add Friend */}
        <form onSubmit={handleSubmit(onAddFriend)}>
          <div className="mb-8">
            <Label htmlFor="email">Friend's Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="friend@example.com"
              {...register('email')}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`w-26 bg-black text-sm text-white p-2 rounded-md h-9 ${isLoading ? 'bg-gray-400' : ''}`}
              disabled={isLoading}
            >
              Add Friend
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal
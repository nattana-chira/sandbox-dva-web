import { User } from '@/libs/api/auth';
import { handleError } from '@/libs/utils/apiErrorHandler';
import { useState } from 'react';

const useAuth = () => {
  const [authUser, setAuthUser] = useState<User | null>(null)

  const handleAuth = ({ receiverId, messageText }: { receiverId: string, messageText: string}) => {
    try {
     
    } catch (e) {
      handleError(e)
    }
  }

  return { authUser }
}

export default useAuth;
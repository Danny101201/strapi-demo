/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserFromLocalCookie } from 'utils/auth';
type UserContextType = {
  user: UserInfo | null,
  loading: boolean
}
// let userState: UserInfo | undefined;
const User = createContext<UserContextType>({ user: null, loading: false });
export const UserProvider = ({ value, children }: any) => {

  return (
    <User.Provider value={value}>{children}</User.Provider>
  )
}

export const useUser = () => useContext(User)

export const useFetchUser = () => {
  const [data, setUser] = useState<UserContextType>({
    user: null,
    loading: true
  })
  useEffect(() => {
    let isMounted = true;
    const resoulveUser = async () => {
      const user = await getUserFromLocalCookie();
      if (isMounted) {
        setUser({ user, loading: false });
      }
    }
    resoulveUser()
    return () => {
      isMounted = false;
    };
  }, [])

  return data;
}
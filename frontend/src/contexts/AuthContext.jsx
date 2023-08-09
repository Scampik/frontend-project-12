import React, { createContext, useState } from 'react'

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null)
  const logIn = (name) => setUserName(name)
  const logOut = () => {
    localStorage.removeItem('userId')
    setUserName(null)
  }

  return (
    <AuthContext.Provider value={{ userName, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

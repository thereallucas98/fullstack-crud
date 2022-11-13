import { Route, Routes } from 'react-router-dom'

import { CreateAccount } from '../pages/public/CreateAccount'
import { Login } from '../pages/public/Login'

export function AuthLogin() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
    </Routes>
  )
}

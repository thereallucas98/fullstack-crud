import { RootState, useAppSelector } from '../redux/store'
import { AppRoutes } from './app.routes'
import { AuthLogin } from './auth.routes'

export function Routes() {
  const user = useAppSelector((state: RootState) => state.auth.user)

  return user ? <AppRoutes /> : <AuthLogin />
}

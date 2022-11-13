import { Button, Stack } from '@chakra-ui/react'
import { House, SignOut, User, Users } from 'phosphor-react'
import { useCallback } from 'react'
import { logout, setCredentials } from '../../redux'
import { useAppDispatch } from '../../redux/store'

import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

export function SidebarNav() {
  const dispatch = useAppDispatch()

  const handleSignOut = useCallback(() => {
    dispatch(logout({ user: null, token: null }))
  }, [dispatch])

  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="geral">
        <NavLink hrefString="/" icon={House}>
          Dashboard
        </NavLink>
        <NavLink hrefString="/users" icon={Users}>
          Usuários
        </NavLink>
      </NavSection>

      <NavSection title="Configurações">
        <NavLink hrefString="/profile" icon={User}>
          Perfil
        </NavLink>
        <Button
          leftIcon={<SignOut size={26} />}
          variant="link"
          colorScheme="white"
          justifyContent="flex-start"
          onClick={handleSignOut}
        >
          Sair
        </Button>
      </NavSection>
    </Stack>
  )
}

import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { SidebarDrawerProvider } from './contexts/SidebarDrawerContext'
import { Provider as ReduxProvider } from 'react-redux'

import store from './redux/store'
import { Routes } from './routes'
import { theme } from './styles/theme'
import { HeaderProvider } from './contexts/HeaderContext'

function App() {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <HeaderProvider>
          <SidebarDrawerProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </SidebarDrawerProvider>
        </HeaderProvider>
      </ChakraProvider>
    </ReduxProvider>
  )
}

export default App

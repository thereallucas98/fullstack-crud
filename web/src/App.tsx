import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { SidebarDrawerProvider } from './contexts/SidebarDrawerContext'
import { Provider as ReduxProvider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import store from './redux/store'
import { Routes } from './routes'
import { theme } from './styles/theme'
import { HeaderProvider } from './contexts/HeaderContext'
import { AuthProvider } from './contexts/AuthContext'

const persistor = persistStore(store)

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          {/* Many providers, this is a known issue */}
          <AuthProvider>
            <HeaderProvider>
              <SidebarDrawerProvider>
                <BrowserRouter>
                  <Routes />
                </BrowserRouter>
              </SidebarDrawerProvider>
            </HeaderProvider>
          </AuthProvider>
        </ChakraProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default App

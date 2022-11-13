import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

interface HeaderContextData {
  value: string | undefined
  changeValue: (value: string) => void
}

interface HeaderProviderProps {
  children: ReactNode
}

const HeaderContext = createContext<HeaderContextData>({} as HeaderContextData)

export function HeaderProvider({ children }: HeaderProviderProps) {
  const [valueToSearch, setValueToSearch] = useState<string | undefined>('')

  const handelChangeValue = useCallback((value: string) => {
    setValueToSearch(value)
  }, [])

  return (
    <HeaderContext.Provider
      value={{ value: valueToSearch, changeValue: handelChangeValue }}
    >
      {children}
    </HeaderContext.Provider>
  )
}

export const useHeader = () => useContext(HeaderContext)

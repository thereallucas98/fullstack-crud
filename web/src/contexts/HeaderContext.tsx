// import { useState, useCallback, useEffect } from 'react';

// const useHeader = (
//   valueString = null
// ): {
//   value: string | null | undefined;
//   changeValue: (value: string) => void;
// } => {
//   const [value, setValue] = useState<string | null>(valueString);
//   useEffect(() => {
//     setValue(valueString);
//   }, [valueString]);
//   const changeValue = useCallback((value: string) => {
//     setValue(value);
//   }, []);

//   console.log("value context", value);

//   return { value, changeValue };
// };

// export default useHeader;

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

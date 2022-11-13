import {
  FormEvent,
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
} from 'react'

import { FieldError } from 'react-hook-form'

import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from '@chakra-ui/react'
import { dateFormat } from './mask'

interface InputProps extends ChakraInputProps {
  mask?: 'date'
  name: string
  label?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, mask, ...rest },
  ref,
) => {
  const handleKeyUp = useCallback((e: FormEvent<HTMLInputElement>) => {
    if (mask && mask === 'date') {
      dateFormat(e)
    }
  }, [])

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor="email">{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        focusBorderColor="blue.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.900',
        }}
        size="lg"
        ref={ref}
        {...rest}
        onKeyUp={handleKeyUp}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)

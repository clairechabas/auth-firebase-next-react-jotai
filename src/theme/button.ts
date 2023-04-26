import { ComponentStyleConfig } from '@chakra-ui/theme'

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: '8px',
    fontSize: '1.5rem',
    fontWeight: 700,
    padding: '1.5rem',
    width: 'full',
    height: '46px',
    _focus: {
      boxShadow: 'none',
    },
  },
  variants: {
    solid: {
      color: 'white',
      bg: 'primary.100',
      border: '1px solid',
      borderColor: 'primary.100',
      _hover: {
        bg: 'primary.80',
        borderColor: 'primary.80',
      },
    },
    outline: {
      color: 'primary.100',
      border: '1px solid',
      borderColor: 'primary.100',
      _hover: {
        bg: 'primary.100',
        color: 'white',
      },
    },
  },
}

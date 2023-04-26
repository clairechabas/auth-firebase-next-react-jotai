import { extendTheme } from '@chakra-ui/react'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import { Button } from './button'

const theme = extendTheme({
  colors: {
    primary: {
      100: 'rgba(26,115,232,1)',
      80: 'rgba(26,115,232,.8)',
    },
  },
  fonts: {
    body: 'Inter, sans-serif',
  },
  components: {
    Button,
  },
})

export default theme

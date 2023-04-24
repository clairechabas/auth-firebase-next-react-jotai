import { extendBaseTheme } from '@chakra-ui/react'

import chakraTheme from '@chakra-ui/theme'

const { Button, Modal } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
    Modal,
  },
})

export default theme

import { auth } from '@/firebase/app'
import {
  authModalState as authModalAtom,
  AuthModalView,
} from '@/store/authModalAtom'
import { Button, Flex } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import { useSetAtom } from 'jotai'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetAtom(authModalAtom)
  const [user] = useAuthState(auth)

  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      justify={{ base: 'center', sm: 'space-between' }}
      gap={5}
      w="full"
    >
      {user ? (
        <Button
          maxWidth="300px"
          mx="auto"
          variant="solid"
          onClick={() => signOut(auth)}
        >
          Log Out
        </Button>
      ) : (
        <>
          <Button
            variant="solid"
            onClick={() =>
              setAuthModalState({ open: true, view: AuthModalView.logIn })
            }
          >
            Log In
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setAuthModalState({ open: true, view: AuthModalView.signUp })
            }
          >
            Sign up
          </Button>
        </>
      )}
    </Flex>
  )
}
export default AuthButtons

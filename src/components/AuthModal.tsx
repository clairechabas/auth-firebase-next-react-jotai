import { auth } from '@/firebase/app'
import { authModalState, AuthModalView } from '@/store/authModalAtom'
import {
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import LogIn from './LogIn'
import ResetPassword from './ResetPassword'
import SignInWithProvider from './SignInWithProvider'
import SignUp from './SignUp'

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useAtom(authModalState)
  const [user, loading, error] = useAuthState(auth)

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
  }

  useEffect(() => {
    if (user) {
      handleClose()
    }
  }, [user])

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" color="ocean-dark">
            {modalState.view === AuthModalView.logIn && 'Log In'}
            {modalState.view === AuthModalView.signUp && 'Sign Up'}
            {modalState.view === AuthModalView.resetPassword &&
              'Reset Password'}
          </ModalHeader>

          <ModalCloseButton fill="ocean-dark" />

          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              direction="column"
              textAlign="center"
              justify="center"
              width="80%"
              gap={6}
            >
              {modalState.view === AuthModalView.logIn && (
                <>
                  <SignInWithProvider />

                  <Text color="ocean-dark" fontWeight={700}>
                    OR
                  </Text>

                  <LogIn />
                </>
              )}
              {modalState.view === AuthModalView.signUp && <SignUp />}
              {modalState.view === AuthModalView.resetPassword && (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>

          <ModalFooter mx="auto" fontSize="10pt" pt={1}>
            {modalState.view === AuthModalView.logIn && (
              <Flex justify="center" width="full">
                <Text>New here?</Text>
                <Link
                  color="primary.100"
                  textDecoration="underline"
                  _hover={{ textDecoration: 'none' }}
                  ml={1}
                  onClick={() =>
                    setModalState((prev) => ({
                      ...prev,
                      view: AuthModalView.signUp,
                    }))
                  }
                >
                  Create an account
                </Link>
                <Text mx={2}>|</Text>
                <Text>Forgot password?</Text>
                <Link
                  color="primary.100"
                  textDecoration="underline"
                  _hover={{ textDecoration: 'none' }}
                  ml={1}
                  onClick={() =>
                    setModalState((prev) => ({
                      ...prev,
                      view: AuthModalView.resetPassword,
                    }))
                  }
                >
                  Reset password
                </Link>
              </Flex>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal

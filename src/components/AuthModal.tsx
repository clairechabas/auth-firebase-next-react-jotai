import { auth } from '@/firebase/app'
import { authModalState, AuthModalView } from '@/store/authModalAtom'
import {
  Button,
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
import ResetPassword from './ResetPassword'
import LogIn from './SignInWithEmailPassword'
import SignInWithMagicLink from './SignInWithMagicLink'
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
            {modalState.view === AuthModalView.signInWithLink &&
              'Sign-In With Magic Link'}
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

                  <Text fontWeight={700}>OR</Text>

                  <Button
                    variant="solid"
                    onClick={() =>
                      setModalState((prev) => ({
                        ...prev,
                        view: AuthModalView.signInWithLink,
                      }))
                    }
                  >
                    Sign-in With Magic Link
                  </Button>

                  <Text fontWeight={700}>OR</Text>

                  <LogIn />
                </>
              )}
              {modalState.view === AuthModalView.signInWithLink && (
                <SignInWithMagicLink />
              )}
              {modalState.view === AuthModalView.signUp && <SignUp />}
              {modalState.view === AuthModalView.resetPassword && (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>

          <ModalFooter mx="auto" fontSize="10pt" pt={5}>
            <Flex justify="center" width="full">
              {(modalState.view === AuthModalView.logIn ||
                modalState.view === AuthModalView.signUp) && (
                <Text>
                  {modalState.view === AuthModalView.signUp
                    ? 'Have an account?'
                    : 'New here?'}
                </Text>
              )}
              <Link
                color="primary.100"
                _hover={{ color: 'primary.80' }}
                ml={1}
                onClick={() =>
                  setModalState((prev) => ({
                    ...prev,
                    view:
                      modalState.view !== AuthModalView.logIn
                        ? AuthModalView.logIn
                        : AuthModalView.signUp,
                  }))
                }
              >
                {modalState.view === AuthModalView.signUp && 'Log In'}
                {modalState.view === AuthModalView.logIn && 'Create an account'}
                {(modalState.view === AuthModalView.resetPassword ||
                  modalState.view === AuthModalView.signInWithLink) &&
                  '< Back to Log In'}
              </Link>
              {(modalState.view === AuthModalView.signUp ||
                modalState.view === AuthModalView.logIn) && (
                <>
                  <Text mx={2}>|</Text>
                  <Text>Forgot password?</Text>
                  <Link
                    color="primary.100"
                    _hover={{ color: 'primary.80' }}
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
                </>
              )}
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal

import { auth } from '@/firebase/app'
import { authModalState } from '@/store/authModalAtom'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import React, { useState } from 'react'
import { useSendSignInLinkToEmail } from 'react-firebase-hooks/auth'

const SignInWithMagicLink: React.FC = () => {
  const [sendSignInLinkToEmail, sending, fbError] =
    useSendSignInLinkToEmail(auth)
  const [email, setEmail] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const setAuthModalState = useSetAtom(authModalState)

  const actionCodeSettings = {
    url: process.env.NEXT_PUBLIC_FIREBASE_MAGIC_LINK_CONTINUE_URL as string,
    handleCodeInApp: true,
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('actionCodeSettings', actionCodeSettings)
    await sendSignInLinkToEmail(email, actionCodeSettings)

    window.localStorage.setItem('emailForSignIn', email)
    console.log('emailForSignIn: ', email)
    console.log(
      'checking localstorage: ',
      window.localStorage.getItem('emailForSignIn')
    )

    setIsSuccess(true)
  }

  return (
    <Flex direction="column" w="full">
      {isSuccess ? (
        <>
          <Text mt={3}>{`Check your email :)`}</Text>
          <Button
            variant="solid"
            mt={5}
            onClick={() =>
              setAuthModalState((prev) => ({ ...prev, open: false }))
            }
          >
            Ok
          </Button>
        </>
      ) : (
        <>
          <Text>
            {`Enter the email associated with your account and we'll send you a
             link to log in.`}
          </Text>

          <form onSubmit={handleSubmit}>
            <Input
              required
              type="email"
              name="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              mt={3}
            />
            <Button
              type="submit"
              isLoading={sending}
              mt={3}
              bg={sending ? 'primary.80' : 'primary.100'}
            >
              Send Link To Sign-In
            </Button>
          </form>
        </>
      )}
    </Flex>
  )
}
export default SignInWithMagicLink

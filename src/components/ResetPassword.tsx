import { auth } from '@/firebase/app'
import { authModalState } from '@/store/authModalAtom'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import React, { useState } from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth'

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth)
  const setAuthModalState = useSetAtom(authModalState)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await sendPasswordResetEmail(email)
    setIsSuccess(true)
  }

  return (
    <Flex direction="column" w="full" gap={3}>
      {isSuccess ? (
        <>
          <Text mt={3}>
            All good! If we have an account registered for that account you will
            receive a link to reset your password.
          </Text>
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
            reset link.`}
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
              Reset Password
            </Button>
          </form>
        </>
      )}
    </Flex>
  )
}
export default ResetPassword

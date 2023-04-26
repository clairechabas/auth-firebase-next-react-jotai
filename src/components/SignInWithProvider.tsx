import { auth } from '@/firebase/app'
import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

const SignInWithProvider: React.FC = () => {
  const [signInWithGoogle, user, loading, fbError] = useSignInWithGoogle(auth)

  return (
    <Flex>
      <Button isLoading={loading} onClick={() => signInWithGoogle()}>
        Continue with Google
      </Button>
      {fbError && (
        <Text textAlign="center" color="red" fontSize="10pt">
          {fbError.message}
        </Text>
      )}
    </Flex>
  )
}
export default SignInWithProvider

import { auth } from '@/firebase/app'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSignInWithEmailLink } from 'react-firebase-hooks/auth'

const SignInWithLinkPage: React.FC = () => {
  const [signInWithEmailLink, user, loading, fbError] =
    useSignInWithEmailLink(auth)
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signInAndRedirect()
  }

  const signInAndRedirect = async () => {
    await signInWithEmailLink(email, window.location.href)

    window.localStorage.removeItem('emailForSignIn')
    router.push('/')
  }

  useEffect(() => {
    const emailFromStorage = window.localStorage.getItem('emailForSignIn')

    if (emailFromStorage) {
      setEmail(emailFromStorage)
      signInAndRedirect()
    } else {
      setEmail('')
    }
  }, [])

  return (
    <Flex>
      <Text>Signing In With Magic Link</Text>
      {email ? (
        <Text>{`Wait while we're authenticating you...`}</Text>
      ) : (
        <>
          <Text>
            {`Please, confirm the email you used to request this sign-in link
             so we can confirm your identity.`}
          </Text>

          <form onSubmit={handleSubmit}>
            <Input
              required
              type="email"
              name="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {fbError && (
              <Text textAlign="center" color="red" fontSize="10pt">
                {fbError.message}
              </Text>
            )}
            <Button type="submit" isLoading={loading}>
              Confirm Email & Log In
            </Button>
          </form>
        </>
      )}
    </Flex>
  )
}
export default SignInWithLinkPage

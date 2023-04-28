import { auth } from '@/firebase/app'
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSignInWithEmailLink } from 'react-firebase-hooks/auth'

const SignInWithLinkPage: React.FC = () => {
  const [signInWithEmailLink, user, loading] = useSignInWithEmailLink(auth)
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signInAndRedirect()
  }

  const signInAndRedirect = async () => {
    await signInWithEmailLink(email, window.location.href)

    window.localStorage.removeItem('emailForSignIn')

    console.log('signed in!')
    console.log(
      'email from local storage should be empty: ',
      window.localStorage.getItem('emailForSignIn')
    )

    // Redirect user to home page
    router.push('/')
  }

  useEffect(() => {
    const emailFromStorage = window.localStorage.getItem('emailForSignIn')
    console.log('emailFromStorage', emailFromStorage)

    if (emailFromStorage) {
      setEmail(emailFromStorage)
      console.log('emailFromStorage', emailFromStorage)
      signInAndRedirect()
    }
  }, [])

  return (
    <Flex
      direction="column"
      align="center"
      position="relative"
      top={200}
      text-align="center"
      width={{ base: '80%', md: '60%', lg: '600px' }}
      height="100vh"
      mx="auto"
    >
      <Flex w="full" direction="column" align="stretch" textAlign="center">
        <Image
          width="90px"
          alignSelf="center"
          src="images/react-firebase.svg"
          alt="Firebase React Logo"
        />
        <Heading fontSize="20pt" fontWeight={700} mt={5}>
          Signing In With Magic Link
        </Heading>

        {loading ? (
          <Text
            fontSize="12pt"
            mt={16}
          >{`Wait while we're authenticating you...`}</Text>
        ) : (
          <>
            <Text fontSize="12pt" mt={16}>
              {`Please, confirm the email you used to request this sign-in link
             so we can confirm your identity.`}
            </Text>

            <form onSubmit={handleSubmit}>
              <FormControl isRequired width="500px" mx="auto">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email used to sign-in..."
                  size="md"
                  mt={8}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" mt={5} isLoading={loading}>
                  Confirm Email & Log In
                </Button>
              </FormControl>
            </form>
          </>
        )}
      </Flex>
    </Flex>
  )
}
export default SignInWithLinkPage

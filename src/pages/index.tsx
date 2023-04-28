import AuthButtons from '@/components/AuthButtons'
import { auth } from '@/firebase/app'
import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'

const Home = () => {
  const [user] = useAuthState(auth)
  console.log('Home: user', user)

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
          Home
        </Heading>
        <Text fontSize="14pt" mt={16}>
          {user
            ? `👋 Hi ${user?.displayName}, welcome!`
            : '🙅‍♀️ You are not signed in yet.'}
        </Text>

        <Flex mt={16}>
          <AuthButtons />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home

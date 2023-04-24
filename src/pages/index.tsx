import { Button, Flex, Heading, Text } from '@chakra-ui/react'

const Home = () => {
  const handleClick = () => {}

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
      <Flex w="full" direction="column" textAlign="center">
        <Heading fontSize="20pt" fontWeight={700}>
          🏡 Home
        </Heading>
        <Text fontSize="14pt" mt={16}>
          🙅‍♀️ You are not signed in/👋 Hi UserName, welcome back!
        </Text>
        <Flex mt={16} gap={5} justify="space-between" align="center">
          <Button w="full" h="50px" colorScheme="purple" onClick={handleClick}>
            Log In
          </Button>
          <Button
            w="full"
            h="50px"
            colorScheme="purple"
            variant="outline"
            onClick={handleClick}
          >
            Sign up
          </Button>

          {/* If user is signed in replace buttons with sign out button
          <button>Log Out</button> */}
        </Flex>
      </Flex>

      {/* Disabled if user is not signed in */}
      <Button
        border="1px solid black"
        isDisabled={true}
        onClick={handleClick}
        colorScheme="purple"
        w="full"
        h="50px"
        mt={32}
      >
        🔐 Confettis/🎉 Confettis
      </Button>
      {/* </main> */}
    </Flex>
  )
}

export default Home

import { auth } from '@/firebase/app'
import { authModalState } from '@/store/authModalAtom'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import React, { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'

const SignUp: React.FC = () => {
  const setAuthModalState = useSetAtom(authModalState)
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [createUserWithEmailAndPassword, user, loading, fbError] =
    useCreateUserWithEmailAndPassword(auth)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Reset the error before trying to submit the form
    if (error) setError('')

    // Check passwords match
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Check password format
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,256}$/gm
    if (!passwordRegex.test(signUpForm.password)) {
      setError(
        'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
      )
      return
    }

    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" w="full">
        <Input
          required
          name="email"
          placeholder="email"
          type="email"
          onChange={handleChange}
          size="md"
        />
        <Input
          required
          name="password"
          placeholder="password"
          type="password"
          onChange={handleChange}
          size="md"
          mt={3}
        />
        <Input
          required
          name="confirmPassword"
          placeholder="Confirm password"
          type="password"
          onChange={handleChange}
          size="md"
          my={3}
        />

        {(error || fbError) && (
          <Text textAlign="center" color="red" fontSize="10pt">
            {error || fbError?.message}
          </Text>
        )}

        <Button mt={3} type="submit" isLoading={loading}>
          Sign Up
        </Button>
      </Flex>
    </form>
  )
}
export default SignUp

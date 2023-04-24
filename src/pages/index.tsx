import Button from '@/shared/Button'

const Home = () => {
  const handleClick = () => {}

  return (
    <main className="lg:w-[600px] md:w-[60%] w-[80%] mx-auto text-center pt-[15%] h-screen">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">🏡 Home</h1>
        <p className="mt-16">
          🙅‍♀️ You are not signed in/👋 Morning UserName, welcome back!
        </p>
        <div className="mt-16 flex gap-5 justify-between items-center">
          <Button variant="primary" onClick={handleClick} addClass="grow">
            Log In
          </Button>
          <Button variant="secondary" onClick={handleClick} addClass="grow">
            Sign up
          </Button>

          {/* If user is signed in replace buttons with sign out button
          <button>Log Out</button> */}
        </div>
      </div>

      {/* Disabled if user is not signed in */}
      <Button
        variant="primary"
        disabled
        onClick={handleClick}
        addClass="w-1/3 mt-32"
      >
        🔐 Confettis/🎉 Confettis
      </Button>
    </main>
  )
}

export default Home

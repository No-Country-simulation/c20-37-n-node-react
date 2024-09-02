import { AuthProvider } from "./context/authContext"
import { UsersProvider } from "./context/usersContext"
import { Router } from "./Router"


function App() {

  return (
    <>
      <AuthProvider>
        <UsersProvider>
          <Router />
        </UsersProvider>
      </AuthProvider>
    </>
  )
}

export default App
